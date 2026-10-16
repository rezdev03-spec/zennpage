import { useEffect, type RefObject } from "react";

/**
 * Keeps the glass / blur look but stops the always-on motion from fighting it.
 *
 * - `.is-scrolling` is set while the page scrolls, so the drifting background logos pause
 *   (backdrop-filter has to re-blur everything behind a glass panel whenever that content moves).
 * - `.lite` is set if the device can't hold ~45fps while idle: the drifting stops for good.
 *   Hover animations, glass and blur are untouched either way.
 */
export function usePerfMode(ref: RefObject<HTMLElement | null>) {
  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // --- scrolling flag (passive, only touches the DOM when the state flips) ---
    let scrolling = false;
    let timer = 0;
    const onScroll = () => {
      if (!scrolling) {
        scrolling = true;
        el.classList.add("is-scrolling");
      }
      window.clearTimeout(timer);
      timer = window.setTimeout(() => {
        scrolling = false;
        el.classList.remove("is-scrolling");
      }, 160);
    };
    window.addEventListener("scroll", onScroll, { passive: true });

    // --- frame-rate probe: after the intro animations settle, sample ~1.2s of frames ---
    let raf = 0;
    const start = window.setTimeout(() => {
      let last = 0;
      let frames = 0;
      let total = 0;
      const t0 = performance.now();
      const tick = (now: number) => {
        if (last) {
          total += now - last;
          frames++;
        }
        last = now;
        if (document.hidden || scrolling) {
          // unreliable sample — try again later
          window.setTimeout(() => (raf = requestAnimationFrame(tick)), 1000);
          last = 0;
          return;
        }
        if (now - t0 < 1200) raf = requestAnimationFrame(tick);
        else if (frames > 20 && total / frames > 24) el.classList.add("lite");
      };
      raf = requestAnimationFrame(tick);
    }, 1800);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.clearTimeout(timer);
      window.clearTimeout(start);
      cancelAnimationFrame(raf);
    };
  }, [ref]);
}

import { ArrowUp } from "lucide-react";
import { SITE } from "../config/site";
import { ZennMark } from "./ZennMark";

export function Footer() {
  const year = new Date().getFullYear();

  const backToTop = () => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" });
  };

  return (
    <footer
      className="reveal mt-10 border-t border-white/[0.06] pt-5 pb-8"
      style={{ "--d": "740ms" } as React.CSSProperties}
    >
      <div className="flex items-center justify-between gap-4">
        <div className="flex min-w-0 items-center gap-2 font-mono text-[11px] text-[var(--color-text-muted)]">
          <ZennMark size={13} className="shrink-0 text-[var(--color-accent)]" />
          <span className="truncate">
            © {year} {SITE.handle}
            <span className="mx-1.5 text-[var(--color-border-bright)]">·</span>
            Built with curiosity.
          </span>
        </div>
        <button
          type="button"
          onClick={backToTop}
          aria-label="Back to top"
          className="glass-surface grid size-10 shrink-0 place-items-center rounded-lg border border-white/[0.1] text-[var(--color-text-muted)] backdrop-blur-lg transition-all duration-200 hover:border-white/[0.18] hover:text-[var(--color-accent)] hover:shadow-[0_2px_12px_rgba(88,166,255,0.1)] active:scale-95"
          style={{ background: "rgba(22, 27, 34, 0.5)" }}
        >
          <ArrowUp aria-hidden="true" className="size-4" />
        </button>
      </div>
    </footer>
  );
}

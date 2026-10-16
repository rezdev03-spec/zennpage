import type { CSSProperties } from "react";
import { BRAND_GLYPHS } from "../lib/brands";

/**
 * Colourful logos / emoji scattered over the whole page, softly blurred so the
 * glass panels in front of them have something to frost.
 * Decorative only — `aria-hidden`, no pointer events.
 */

interface Item {
  /** a key of BRAND_GLYPHS, or an emoji character */
  g: string;
  x: number; // left, % of column
  y: number; // top, px from the top of the page body
  s: number; // size, px
  o: number; // opacity
  b: number; // blur, px
  r: number; // rotation, deg
}

const ITEMS: Item[] = [
  { g: "react", x: 3, y: 90, s: 92, o: 0.5, b: 1.5, r: -12 },
  { g: "⚡", x: 62, y: 70, s: 56, o: 0.85, b: 1, r: 8 },
  { g: "javascript", x: 80, y: 150, s: 58, o: 0.5, b: 1.5, r: 10 },
  { g: "html5", x: 12, y: 250, s: 64, o: 0.42, b: 2, r: 6 },
  { g: "python", x: 0, y: 440, s: 84, o: 0.55, b: 1.5, r: -6 },
  { g: "✨", x: 72, y: 540, s: 40, o: 0.9, b: 0.5, r: 0 },
  { g: "🚀", x: 84, y: 620, s: 54, o: 0.8, b: 1.5, r: 12 },
  { g: "nodedotjs", x: -2, y: 690, s: 92, o: 0.4, b: 2.5, r: 8 },
  { g: "🧠", x: 22, y: 720, s: 58, o: 0.8, b: 1.5, r: -8 },
  { g: "css3", x: 76, y: 860, s: 66, o: 0.4, b: 2, r: 12 },
  { g: "git", x: 4, y: 960, s: 60, o: 0.45, b: 2.5, r: -14 },
  { g: "telegram", x: 82, y: 1040, s: 52, o: 0.5, b: 1.5, r: 14 },
  { g: "💻", x: 6, y: 1180, s: 56, o: 0.7, b: 2, r: -6 },
  { g: "whatsapp", x: 80, y: 1260, s: 56, o: 0.42, b: 2, r: 8 },
  { g: "github", x: 8, y: 1380, s: 52, o: 0.32, b: 2, r: -10 },
  { g: "tiktok", x: 86, y: 1440, s: 46, o: 0.3, b: 1.5, r: 6 },
  { g: "🔥", x: 74, y: 1540, s: 50, o: 0.75, b: 2, r: 4 },
  { g: "vercel", x: 3, y: 1560, s: 46, o: 0.28, b: 2, r: -8 },
];

/** Distinct blur radii, each baked once into a shared SVG filter. */
const BLURS = [...new Set(ITEMS.map((it) => it.b))];
const blurId = (b: number) => `lb${String(b).replace(".", "_")}`;

/**
 * Performance notes (low-end Android GPUs):
 * - The blur lives INSIDE each SVG (feGaussianBlur), so it is rasterised once into the
 *   layer's texture. A CSS `filter: blur()` on a moving element is re-run by the GPU
 *   every frame, which was the single most expensive thing on this page.
 * - The wrapper only animates `transform` (compositor-only).
 * - Emoji are drawn as SVG <text> so they take the same baked-blur path.
 */
export function FloatingLogos() {
  return (
    <div className="logos" aria-hidden="true">
      <svg width="0" height="0" style={{ position: "absolute" }} focusable="false">
        <defs>
          {BLURS.map((b) => (
            <filter key={b} id={blurId(b)} x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation={b} />
            </filter>
          ))}
        </defs>
      </svg>

      {ITEMS.map((it, i) => {
        const glyph = BRAND_GLYPHS[it.g];
        const style = {
          left: `${it.x}%`,
          top: it.y,
          width: it.s,
          height: it.s,
          "--r": `${it.r}deg`,
          "--t": `${9 + (i % 5) * 2.2}s`,
          "--dl": `${-(i * 1.7)}s`,
        } as CSSProperties;

        const hex = glyph ? (glyph.hex === "000000" || glyph.hex === "181717" ? "e6edf3" : glyph.hex) : "";
        return (
          <span key={i} className="logo" style={style}>
            <svg viewBox="0 0 24 24" width="100%" height="100%" opacity={it.o}>
              <g filter={`url(#${blurId(it.b)})`}>
                {glyph ? (
                  <path d={glyph.path} fill={`#${hex}`} />
                ) : (
                  <text x="12" y="12.5" fontSize="19" textAnchor="middle" dominantBaseline="central">
                    {it.g}
                  </text>
                )}
              </g>
            </svg>
          </span>
        );
      })}
    </div>
  );
}

import { BRAND_GLYPHS } from "../lib/brands";
import type { BrandKey } from "../config/site";

/**
 * Floating colorful brand logos scattered behind the profile hero.
 * Purely decorative — static positioned, low opacity, no animation.
 */

interface FloatingLogo {
  brand: BrandKey;
  x: string;      // CSS left
  y: string;      // CSS top
  size: number;
  opacity: number;
  rotate: number;
}

const LOGOS: FloatingLogo[] = [
  { brand: "python",     x: "-2%", y: "4%",   size: 68, opacity: 0.28, rotate: -12 },
  { brand: "react",      x: "76%", y: "18%",  size: 62, opacity: 0.25, rotate: 15 },
  { brand: "html5",      x: "4%",  y: "36%",  size: 52, opacity: 0.22, rotate: 8 },
  { brand: "javascript", x: "80%", y: "2%",   size: 46, opacity: 0.22, rotate: -20 },
  { brand: "nodedotjs",  x: "72%", y: "52%",  size: 50, opacity: 0.20, rotate: 10 },
  { brand: "git",        x: "12%", y: "60%",  size: 42, opacity: 0.18, rotate: -8 },
  { brand: "github",     x: "85%", y: "70%",  size: 40, opacity: 0.16, rotate: 5 },
  { brand: "vercel",     x: "0%",  y: "78%",  size: 38, opacity: 0.16, rotate: -15 },
  { brand: "css3",       x: "65%", y: "78%",  size: 44, opacity: 0.18, rotate: 12 },
  { brand: "telegram",   x: "22%", y: "16%",  size: 38, opacity: 0.17, rotate: 20 },
];

export function FloatingLogos() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 overflow-hidden"
    >
      {LOGOS.map((logo) => {
        const glyph = BRAND_GLYPHS[logo.brand];
        if (!glyph) return null;
        const hex = glyph.hex === "000000" ? "e6edf3" : glyph.hex;
        return (
          <svg
            key={logo.brand}
            viewBox="0 0 24 24"
            fill={`#${hex}`}
            width={logo.size}
            height={logo.size}
            className="absolute fade-in"
            style={{
              left: logo.x,
              top: logo.y,
              opacity: logo.opacity,
              transform: `rotate(${logo.rotate}deg)`,
              "--d": "200ms",
            } as React.CSSProperties}
          >
            <path d={glyph.path} />
          </svg>
        );
      })}
    </div>
  );
}

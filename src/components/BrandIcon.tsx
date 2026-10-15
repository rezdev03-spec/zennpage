import { BRAND_GLYPHS } from "../lib/brands";
import type { BrandKey } from "../config/site";

interface BrandIconProps {
  name: BrandKey;
  size?: number;
  className?: string;
  /** If true, fill with the brand's authentic hex color */
  colored?: boolean;
}

export function BrandIcon({ name, size = 20, className, colored }: BrandIconProps) {
  const glyph = BRAND_GLYPHS[name];

  if (!glyph) {
    return (
      <span
        aria-hidden="true"
        className={className}
        style={{ width: size, height: size, display: "inline-block", background: "currentColor", borderRadius: 4 }}
      />
    );
  }

  const hex = glyph.hex === "000000" ? "e6edf3" : glyph.hex;
  const fillColor = colored ? `#${hex}` : undefined;

  return (
    <svg
      role="img"
      aria-label={glyph.title}
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill={fillColor ?? "currentColor"}
      className={className}
    >
      <path d={glyph.path} />
    </svg>
  );
}

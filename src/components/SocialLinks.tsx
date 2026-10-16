import { SOCIALS, type BrandKey } from "../config/site";
import { BRAND_GLYPHS } from "../lib/brands";
import { BrandIcon } from "./BrandIcon";
import { Palette, type PaletteRow } from "./Palette";

/**
 * TikTok mark: ONE svg with three stacked paths (cyan / red echo + white note)
 * instead of three separate SVG elements. The viewBox is cropped to the real
 * glyph bounds so the note is optically centred, and it is sized to match the
 * other brand icons. Offsets are in SVG user units so they stay crisp at any DPR.
 */
function TikTokGlyph() {
  const d = BRAND_GLYPHS.tiktok.path;
  return (
    <svg className="tt" viewBox="1.4 -1.2 21.6 26.4" width={25} height={30} aria-hidden="true" focusable="false">
      <path className="tt-c" d={d} fill="#25f4ee" />
      <path className="tt-r" d={d} fill="#fe2c55" />
      <path className="tt-w" d={d} fill="#fff" />
    </svg>
  );
}

function Glyph({ brand }: { brand: BrandKey }) {
  if (brand === "tiktok") return <TikTokGlyph />;
  return <BrandIcon name={brand} size={brand === "telegram" ? 30 : 28} />;
}

const LOOK: Partial<Record<BrandKey, Pick<PaletteRow, "tileBg" | "tileGlow" | "tileBorder">>> = {
  tiktok: {
    tileBg: "linear-gradient(145deg,#1b1b24,#050508)",
    tileGlow: "rgba(37,244,238,0.22)",
    tileBorder: "rgba(255,255,255,0.14)",
  },
  whatsapp: { tileBg: "#25d366", tileGlow: "rgba(37,211,102,0.5)" },
  telegram: {
    tileBg: "linear-gradient(145deg,#3bb4ee,#1e92c9)",
    tileGlow: "rgba(42,171,238,0.45)",
  },
};

const FALLBACK = { tileBg: "#101826", tileGlow: "rgba(91,156,240,0.3)" };

/** "what to explore today?" — the social links, in command-palette form. */
export function SocialLinks() {
  const rows: PaletteRow[] = SOCIALS.map((s) => ({
    id: s.id,
    href: s.url,
    title: s.label,
    note: s.note,
    badge: s.badge,
    tile: <Glyph brand={s.brand} />,
    ...(LOOK[s.brand] ?? FALLBACK),
  }));

  return <Palette label="Social links" heading="what to explore today?" rows={rows} delay={300} />;
}

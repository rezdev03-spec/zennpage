import { SOCIALS, type BrandKey } from "../config/site";
import { BrandIcon } from "./BrandIcon";
import { Palette, type PaletteRow } from "./Palette";

function Glyph({ brand }: { brand: BrandKey }) {
  if (brand === "tiktok") {
    // the classic cyan / red split behind the white note
    return (
      <span className="tt" aria-hidden="true">
        <BrandIcon name="tiktok" size={24} className="tt-c" />
        <BrandIcon name="tiktok" size={24} className="tt-r" />
        <BrandIcon name="tiktok" size={24} className="tt-w" />
      </span>
    );
  }
  return <BrandIcon name={brand} size={brand === "telegram" ? 30 : 28} />;
}

const LOOK: Partial<Record<BrandKey, Pick<PaletteRow, "tileBg" | "tileGlow" | "tileBorder">>> = {
  tiktok: { tileBg: "#0a0a0f", tileGlow: "rgba(37,244,238,0.22)", tileBorder: "rgba(255,255,255,0.1)" },
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

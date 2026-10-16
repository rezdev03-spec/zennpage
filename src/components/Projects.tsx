import { PROJECTS, type Project } from "../config/site";
import { ClipboardIcon, LinkIcon, SparkIcon } from "./icons";
import { Palette, type PaletteRow } from "./Palette";

const ACCENTS = ["#58a6ff", "#3fb950", "#d2a8ff"]; // blue · green · purple

function ProjectGlyph({ icon }: { icon: Project["icon"] }) {
  if (icon === "link") return <LinkIcon size={24} />;
  if (icon === "clipboard") return <ClipboardIcon size={24} />;
  return <SparkIcon size={24} />;
}

/** "Zenn Projects" — same palette treatment, accent-coloured dark tiles. */
export function Projects() {
  const rows: PaletteRow[] = PROJECTS.map((p, i) => {
    const accent = ACCENTS[i % ACCENTS.length];
    return {
      id: p.id,
      href: p.url,
      title: p.title,
      note: p.description,
      extra: p.domain,
      badge: p.badge,
      tile: <ProjectGlyph icon={p.icon} />,
      tileBg: "#09111f",
      tileFg: accent,
      tileGlow: `${accent}55`,
      tileBorder: `${accent}66`,
    };
  });

  return <Palette label="Projects" heading="Zenn Projects" rows={rows} delay={420} />;
}

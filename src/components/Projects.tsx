import { ArrowUpRight, Link2, ClipboardList } from "lucide-react";
import { PROJECTS, type Project } from "../config/site";

function NyxSpark({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 16 16"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
    >
      <path d="M8 1.5v13M1.5 8h13M3.4 3.4l9.2 9.2M12.6 3.4l-9.2 9.2" />
    </svg>
  );
}

function ProjectIcon({ icon, className }: { icon: Project["icon"]; className?: string }) {
  if (icon === "link") return <Link2 aria-hidden="true" className={className} />;
  if (icon === "clipboard") return <ClipboardList aria-hidden="true" className={className} />;
  return <NyxSpark className={className} />;
}

const ACCENT_COLORS = [
  "#58a6ff", // blue
  "#3fb950", // green
  "#d2a8ff", // purple
];

export function Projects() {
  return (
    <div className="space-y-3">
      {PROJECTS.map((project, i) => (
        <a
          key={project.id}
          href={project.url}
          target="_blank"
          rel="noopener noreferrer"
          className="group reveal glass-surface relative flex min-h-[68px] items-center gap-4 overflow-hidden rounded-xl border border-[var(--color-border-glass)] pl-0 pr-4 backdrop-blur-lg transition-all duration-200 hover:border-white/[0.16] hover:shadow-[0_4px_24px_rgba(88,166,255,0.06)] active:scale-[0.99]"
          style={{
            "--d": `${510 + i * 60}ms`,
            "--accent": ACCENT_COLORS[i],
            background: "rgba(22, 27, 34, 0.5)",
          } as React.CSSProperties}
        >
          {/* Top sheen on hover */}
          <span
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-4 top-0 h-px bg-gradient-to-r from-transparent via-white/[0.08] to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          />

          {/* Left accent bar */}
          <span className="h-full w-[3px] shrink-0 self-stretch bg-[var(--accent)] transition-all duration-200 group-hover:w-[4px] group-hover:shadow-[0_0_8px_var(--accent)]" />

          {/* Icon — inner glass */}
          <span className="ml-3 grid size-10 shrink-0 place-items-center rounded-lg border border-white/[0.08] bg-white/[0.04] text-[var(--accent)] backdrop-blur-sm transition-all duration-200 group-hover:border-white/[0.14] group-hover:bg-white/[0.07]">
            <ProjectIcon icon={project.icon} className="size-[18px]" />
          </span>

          <span className="min-w-0 flex-1 py-3">
            <span className="block text-[15px] font-semibold text-[var(--color-text-primary)]">
              {project.title}
            </span>
            <span className="mt-0.5 block text-[12.5px] text-[var(--color-text-secondary)]">
              {project.description}
              <span className="ml-1 font-mono text-[11px] text-[var(--color-text-muted)]">
                · {project.domain}
              </span>
            </span>
          </span>

          <ArrowUpRight
            aria-hidden="true"
            className="size-4 shrink-0 text-[var(--color-text-muted)] transition-all duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-[var(--accent)]"
          />
        </a>
      ))}
    </div>
  );
}

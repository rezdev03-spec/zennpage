import { TECH_STACK } from "../config/site";
import { BrandIcon } from "./BrandIcon";

/**
 * Compact tech grid — glassmorphic with colorful brand icons.
 */
export function TechStack() {
  return (
    <ul
      aria-label="Technologies"
      className="reveal glass-surface relative overflow-hidden rounded-xl border border-[var(--color-border-glass)] backdrop-blur-xl"
      style={{
        "--d": "680ms",
        background: "rgba(22, 27, 34, 0.45)",
      } as React.CSSProperties}
    >
      {/* Top sheen */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-8 top-0 z-10 h-px bg-gradient-to-r from-transparent via-white/[0.08] to-transparent"
      />

      <div className="grid grid-cols-3">
        {TECH_STACK.map((tech, i) => {
          const isLastRow = i >= TECH_STACK.length - (TECH_STACK.length % 3 || 3);
          const isLastCol = (i + 1) % 3 === 0;
          return (
            <li
              key={tech.brand}
              className={[
                "group flex h-[80px] flex-col items-center justify-center gap-2 border-white/[0.06] transition-all duration-200 hover:bg-white/[0.04]",
                isLastCol ? "" : "border-r",
                isLastRow ? "" : "border-b",
              ].join(" ")}
            >
              <BrandIcon
                name={tech.brand}
                size={22}
                colored
                className="transition-transform duration-200 group-hover:scale-110"
              />
              <span className="font-mono text-[10px] uppercase tracking-[0.1em] text-[var(--color-text-muted)] transition-colors duration-200 group-hover:text-[var(--color-text-secondary)]">
                {tech.label}
              </span>
            </li>
          );
        })}
      </div>
    </ul>
  );
}

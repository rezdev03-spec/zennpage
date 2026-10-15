import { ArrowUpRight } from "lucide-react";
import { SOCIALS } from "../config/site";
import { BrandIcon } from "./BrandIcon";

/**
 * Social link cards — glassmorphic with left accent border and brand-colored icons.
 */
export function SocialLinks() {
  return (
    <nav aria-label="Social links" className="space-y-3">
      {SOCIALS.map((social, i) => (
        <a
          key={social.id}
          href={social.url}
          target="_blank"
          rel="noopener noreferrer"
          className="group reveal glass-surface relative flex min-h-[68px] items-center gap-4 overflow-hidden rounded-xl border border-[var(--color-border-glass)] pl-0 pr-4 backdrop-blur-lg transition-all duration-200 hover:border-white/[0.16] hover:shadow-[0_4px_24px_rgba(88,166,255,0.06)] active:scale-[0.99]"
          style={{
            "--d": `${330 + i * 60}ms`,
            background: "rgba(22, 27, 34, 0.5)",
          } as React.CSSProperties}
        >
          {/* Top sheen — only visible on hover */}
          <span
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-4 top-0 h-px bg-gradient-to-r from-transparent via-white/[0.08] to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          />

          {/* Left accent bar */}
          <span className="h-full w-[3px] shrink-0 self-stretch bg-[var(--color-accent)] transition-all duration-200 group-hover:w-[4px] group-hover:shadow-[0_0_8px_rgba(88,166,255,0.3)]" />

          {/* Icon container — inner glass */}
          <span className="ml-3 grid size-11 shrink-0 place-items-center rounded-xl border border-white/[0.08] bg-white/[0.04] backdrop-blur-sm transition-all duration-200 group-hover:border-white/[0.14] group-hover:bg-white/[0.07]">
            <BrandIcon name={social.brand} size={22} colored />
          </span>

          <span className="min-w-0 flex-1 py-3">
            <span className="block text-[15px] font-semibold text-[var(--color-text-primary)]">
              {social.label}
            </span>
            <span className="mt-0.5 block truncate text-[12.5px] text-[var(--color-accent)]">
              {social.note}
            </span>
          </span>

          <ArrowUpRight
            aria-hidden="true"
            className="size-4 shrink-0 text-[var(--color-text-muted)] transition-all duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-[var(--color-accent)]"
          />
        </a>
      ))}
    </nav>
  );
}

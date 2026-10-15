interface SectionHeadingProps {
  icon?: string;
  title: string;
  delay?: number;
}

/**
 * Section heading with glass pill background and accent icon.
 */
export function SectionHeading({ icon = "▼", title, delay = 0 }: SectionHeadingProps) {
  return (
    <div
      className="reveal mb-4 flex items-center gap-2.5 px-1"
      style={{ "--d": `${delay}ms` } as React.CSSProperties}
    >
      <span className="inline-flex items-center gap-2 rounded-lg border border-white/[0.07] bg-white/[0.03] px-3 py-1.5 backdrop-blur-sm">
        <span className="text-[var(--color-accent)] text-sm">{icon}</span>
        <h2 className="font-mono text-[14px] font-medium tracking-[0.02em] text-[var(--color-text-primary)]">
          {title}
        </h2>
      </span>
    </div>
  );
}

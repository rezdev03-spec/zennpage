/**
 * Monospace keyword tags below the code block — like in the reference.
 */
export function TagLine() {
  const tags = ["WEB DEV", "TOOLS", "AI EXPLORER"];
  return (
    <div
      className="reveal mt-5 flex flex-wrap items-center justify-center gap-x-2 font-mono text-[11px] uppercase tracking-[0.14em] text-[var(--color-text-muted)]"
      style={{ "--d": "250ms" } as React.CSSProperties}
    >
      {tags.map((tag, i) => (
        <span key={tag} className="flex items-center gap-2">
          {i > 0 && <span className="text-[var(--color-border-bright)]">·</span>}
          {tag}
        </span>
      ))}
    </div>
  );
}

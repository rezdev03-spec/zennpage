/**
 * Stylized code editor block — glassmorphic with frosted background,
 * line numbers, and syntax-highlighted pseudo-Python code.
 */
export function CodeBlock() {
  const lines = [
    { num: 1, tokens: [{ text: "# ngulik web, bikin tools, eksplorasi AI", cls: "text-[var(--color-text-muted)]" }] },
    { num: 2, tokens: [] },
    {
      num: 3,
      tokens: [
        { text: "for", cls: "text-[#ff7b72]" },
        { text: " project ", cls: "text-[var(--color-text-primary)]" },
        { text: "in", cls: "text-[#ff7b72]" },
        { text: " range", cls: "text-[#d2a8ff]" },
        { text: "(", cls: "text-[var(--color-text-primary)]" },
        { text: "ide", cls: "text-[#a5d6ff]" },
        { text: ", ", cls: "text-[var(--color-text-primary)]" },
        { text: "realita", cls: "text-[#a5d6ff]" },
        { text: "):", cls: "text-[var(--color-text-primary)]" },
      ],
    },
    {
      num: 4,
      tokens: [
        { text: "    result ", cls: "text-[var(--color-text-primary)]" },
        { text: "= ", cls: "text-[#ff7b72]" },
        { text: "build", cls: "text-[#d2a8ff]" },
        { text: "(", cls: "text-[var(--color-text-primary)]" },
        { text: "'tools & web'", cls: "text-[#a5d6ff]" },
        { text: ")", cls: "text-[var(--color-text-primary)]" },
      ],
    },
    {
      num: 5,
      tokens: [
        { text: "    result", cls: "text-[var(--color-text-primary)]" },
        { text: ".", cls: "text-[var(--color-text-secondary)]" },
        { text: "deploy", cls: "text-[#d2a8ff]" },
        { text: "()", cls: "text-[var(--color-text-primary)]" },
        { text: "█", cls: "text-[var(--color-accent)] cursor-blink" },
      ],
    },
  ];

  return (
    <div
      className="reveal glass-surface relative mx-auto overflow-hidden rounded-xl border border-[var(--color-border-glass)] backdrop-blur-xl"
      style={{
        "--d": "180ms",
        background: "rgba(22, 27, 34, 0.55)",
      } as React.CSSProperties}
    >
      {/* Top sheen */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-white/[0.1] to-transparent"
      />
      {/* Subtle inner glow at top */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-white/[0.025] to-transparent"
      />

      <div className="relative overflow-x-auto px-4 py-4">
        <pre className="font-mono text-[13px] leading-[1.7]">
          {lines.map((line) => (
            <div key={line.num} className="flex">
              <span className="mr-5 inline-block w-4 shrink-0 select-none text-right text-[var(--color-text-muted)]">
                {line.num}
              </span>
              <span>
                {line.tokens.map((t, i) => (
                  <span key={i} className={t.cls}>{t.text}</span>
                ))}
                {line.tokens.length === 0 && "\u00A0"}
              </span>
            </div>
          ))}
        </pre>
      </div>
    </div>
  );
}

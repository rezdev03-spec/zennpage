/**
 * Editor-style code block: line-number gutter, One Dark syntax colours,
 * blinking block cursor. Hover lights the border and the line under the pointer.
 */
type Tok = [cls: string, text: string];

const LINES: Tok[][] = [
  [["c", "# tinker with web, build tools, explore AI"]],
  [
    ["k", "for"],
    ["p", " project "],
    ["k", "in"],
    ["p", " "],
    ["k", "range"],
    ["p", "("],
    ["a", "idea"],
    ["p", ", "],
    ["a", "reality"],
    ["p", "):"],
  ],
  [
    ["p", "    result "],
    ["p", "= "],
    ["f", "build"],
    ["p", "("],
    ["s", "'tools & web'"],
    ["p", ")"],
  ],
  [
    ["p", "    result"],
    ["p", "."],
    ["f", "deploy"],
    ["p", "()"],
    ["cur", ""],
  ],
];

export function CodeBlock() {
  return (
    <div className="code reveal" style={{ "--d": "160ms" } as React.CSSProperties}>
      <span className="code-sheen" aria-hidden="true" />
      {LINES.map((line, i) => (
        <div className="code-line" key={i}>
          <span className="ln" aria-hidden="true">
            {i + 1}
          </span>
          <code className="tx">
            {line.map(([cls, text], j) =>
              cls === "cur" ? (
                <span key={j} className="cursor" aria-hidden="true" />
              ) : (
                <span key={j} className={`t-${cls}`}>
                  {text}
                </span>
              )
            )}
          </code>
        </div>
      ))}
    </div>
  );
}

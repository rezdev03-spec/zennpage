/** Monospace keyword row under the code block. */
export function TagLine() {
  const tags = ["WEB DEV", "TOOLS", "AI EXPLORER"];
  return (
    <p className="tags reveal" style={{ "--d": "230ms" } as React.CSSProperties}>
      {tags.map((tag, i) => (
        <span key={tag}>
          {i > 0 && <b aria-hidden="true"> · </b>}
          <span className="tag">{tag}</span>
        </span>
      ))}
    </p>
  );
}

import { useState, type CSSProperties } from "react";

const mood = (v: number) =>
  v < 30 ? "still learning" : v < 60 ? "not bad" : v < 90 ? "that's the spirit" : "flawless";

/** Draggable "accuracy" slider — gradient fill, glowing knob, live % read-out. */
export function Accuracy() {
  const [v, setV] = useState(80);

  return (
    <section
      className="acc reveal"
      style={{ "--d": "520ms" } as CSSProperties}
      aria-label="Accuracy slider"
    >
      <div className="acc-top">
        <span>
          accuracy <i>//</i> <b>{mood(v)}</b>
        </span>
        <output className="acc-val" htmlFor="accuracy">
          {v}%
        </output>
      </div>

      <input
        id="accuracy"
        className="range"
        type="range"
        min={0}
        max={100}
        value={v}
        onChange={(e) => setV(Number(e.target.value))}
        style={{ "--p": v / 100 } as CSSProperties}
        aria-label="Accuracy"
      />

      <p className="acc-hint" aria-hidden="true">
        <span className="nudge-l">←</span> slide <span className="nudge-r">→</span>
      </p>
    </section>
  );
}

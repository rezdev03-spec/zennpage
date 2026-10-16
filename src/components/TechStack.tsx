import type { CSSProperties } from "react";
import { TECH_STACK } from "../config/site";
import { BrandIcon } from "./BrandIcon";

/** "Tech I Explore" — a single row of brand icons; each lifts and shows its name on hover. */
export function TechStack() {
  return (
    <section className="tech reveal" style={{ "--d": "600ms" } as CSSProperties} aria-label="Tech I Explore">
      <h2 className="tech-label">
        <i>//</i> Tech I Explore
      </h2>
      <ul className="tech-row">
        {TECH_STACK.map((tech, i) => (
          <li
            key={tech.brand}
            className="tech-ic"
            data-label={tech.label}
            style={{ "--i": i } as CSSProperties}
          >
            <BrandIcon name={tech.brand} size={22} colored />
            <span className="sr-only">{tech.label}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}

import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  type CSSProperties,
  type ReactNode,
} from "react";
import type { Badge } from "../config/site";
import { ArrowUpRightIcon, TriangleIcon } from "./icons";

export interface PaletteRow {
  id: string;
  href: string;
  title: string;
  note: string;
  /** optional extra mono line (e.g. a domain) */
  extra?: string;
  badge?: Badge;
  tile: ReactNode;
  /** CSS colours for the icon tile */
  tileBg: string;
  tileGlow: string;
  tileFg?: string;
  tileBorder?: string;
}

interface PaletteProps {
  label: string;
  heading: string;
  rows: PaletteRow[];
  delay: number;
}

/**
 * Command-palette style link list.
 * - A single highlight bar glides to whichever row is hovered, focused or keyboard-selected.
 * - ↑ / ↓ move the selection while the pointer is over the card (or focus is inside it).
 *   Enter opens the focused row natively.
 */
export function Palette({ label, heading, rows, delay }: PaletteProps) {
  const [active, setActive] = useState(0);
  const activeRef = useRef(0);
  const engaged = useRef(false);
  const listRef = useRef<HTMLDivElement>(null);
  const rowRefs = useRef<(HTMLAnchorElement | null)[]>([]);

  const select = useCallback((i: number) => {
    activeRef.current = i;
    setActive(i);
  }, []);

  // Position the sliding highlight over the active row.
  const measure = useCallback(() => {
    const list = listRef.current;
    const row = rowRefs.current[activeRef.current];
    if (!list || !row) return;
    list.style.setProperty("--hl-y", `${row.offsetTop}px`);
    list.style.setProperty("--hl-h", `${row.offsetHeight}px`);
    list.style.setProperty("--hl-o", "1");
  }, []);

  useLayoutEffect(measure, [active, measure]);

  useEffect(() => {
    const ro = new ResizeObserver(measure);
    if (listRef.current) ro.observe(listRef.current);
    rowRefs.current.forEach((r) => r && ro.observe(r));
    void document.fonts?.ready.then(measure);
    return () => ro.disconnect();
  }, [measure]);

  // Keyboard: ↑ / ↓ while the card is engaged.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (!engaged.current) return;
      if (e.key !== "ArrowDown" && e.key !== "ArrowUp") return;
      const t = e.target as HTMLElement | null;
      if (t && (t.tagName === "INPUT" || t.tagName === "TEXTAREA" || t.isContentEditable)) return;
      e.preventDefault();
      const n = rows.length;
      const next = e.key === "ArrowDown" ? (activeRef.current + 1) % n : (activeRef.current - 1 + n) % n;
      select(next);
      rowRefs.current[next]?.focus();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [rows.length, select]);

  return (
    <section
      className="palette reveal"
      style={{ "--d": `${delay}ms` } as CSSProperties}
      aria-label={label}
      onPointerEnter={() => (engaged.current = true)}
      onPointerLeave={(e) => {
        if (!e.currentTarget.contains(document.activeElement)) engaged.current = false;
      }}
      onFocus={() => (engaged.current = true)}
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node | null)) engaged.current = false;
      }}
    >
      <h2 className="palette-head">
        <TriangleIcon className="tri" size={12} />
        <span>{heading}</span>
      </h2>

      <div className="list" ref={listRef}>
        <div className="hl" aria-hidden="true" />
        <ul>
          {rows.map((row, i) => (
            <li key={row.id}>
              <a
                ref={(el) => {
                  rowRefs.current[i] = el;
                }}
                className="row"
                href={row.href}
                target="_blank"
                rel="noopener noreferrer"
                data-active={active === i}
                onPointerEnter={() => select(i)}
                onFocus={() => select(i)}
                style={
                  {
                    "--tile-bg": row.tileBg,
                    "--tile-glow": row.tileGlow,
                    "--tile-fg": row.tileFg ?? "#fff",
                    "--tile-border": row.tileBorder ?? "transparent",
                  } as CSSProperties
                }
              >
                <span className="tile">{row.tile}</span>

                <span className="row-text">
                  <span className="row-title">{row.title}</span>
                  {row.badge && (
                    <span className="badge" data-tone={row.badge.tone}>
                      {row.badge.label}
                    </span>
                  )}
                  <span className="row-note">{row.note}</span>
                  {row.extra && <span className="row-extra">{row.extra}</span>}
                </span>

                <span className="go" aria-hidden="true">
                  <ArrowUpRightIcon size={16} />
                </span>
              </a>
            </li>
          ))}
        </ul>
      </div>

      <footer className="palette-foot">
        <span className="keys">
          <span>
            <b>↑↓</b> select
          </span>
          <span>
            <b className="enter">↵</b> open
          </span>
        </span>
        <span>{rows.length} results</span>
      </footer>
    </section>
  );
}

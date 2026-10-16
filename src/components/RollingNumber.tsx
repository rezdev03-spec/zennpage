import type { CSSProperties } from "react";

const DIGITS = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
const fmt = new Intl.NumberFormat("en-US");

/**
 * Odometer-style number: every digit is a vertical 0–9 strip that slides to
 * its value. Columns are keyed from the right so existing digits keep
 * animating when the number grows a new digit.
 */
export function RollingNumber({ value }: { value: number }) {
  const chars = fmt.format(value).split("");
  return (
    <span className="roll" aria-hidden="true">
      {chars.map((ch, i) => {
        const key = chars.length - i;
        if (ch < "0" || ch > "9") {
          return (
            <span key={key} className="roll-sep">
              {ch}
            </span>
          );
        }
        return (
          <span key={key} className="roll-col">
            <span className="roll-strip" style={{ "--n": Number(ch) } as CSSProperties}>
              {DIGITS.map((d) => (
                <i key={d}>{d}</i>
              ))}
            </span>
          </span>
        );
      })}
    </span>
  );
}

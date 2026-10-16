import { ZennMark } from "./ZennMark";
import { VisitorCounter } from "./VisitorCounter";

/**
 * Sticky terminal-window bar: traffic lights, a file tab, and the live visitor counter.
 */
export function TerminalHeader() {
  return (
    <header className="bar">
      <div className="bar-dots" aria-hidden="true">
        <span style={{ background: "#ff5f57" }} />
        <span style={{ background: "#febc2e" }} />
        <span style={{ background: "#28c840" }} />
      </div>

      <div className="bar-tab">
        <span className="bar-fav" aria-hidden="true">
          <ZennMark size={12} />
        </span>
        <span>zenn.hub</span>
      </div>

      <VisitorCounter />
    </header>
  );
}

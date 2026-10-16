import { useVisitors } from "../hooks/useVisitors";
import { VISITORS } from "../config/site";
import { RollingNumber } from "./RollingNumber";

const fmt = new Intl.NumberFormat("en-US");

/** "● 8,458 visitors" — real count, refreshed live, with a "+n" pop when someone new arrives. */
export function VisitorCounter() {
  const { count, status, bump, delta } = useVisitors();

  const tip =
    status === "offline"
      ? "offline · showing last known count"
      : status === "loading"
        ? "connecting…"
        : `live · updates every ${Math.round(VISITORS.pollMs / 1000)}s`;

  const label =
    count === null ? "Visitor count loading" : `${fmt.format(count)} visitors, ${tip}`;

  return (
    <div
      className="visitors"
      data-status={status}
      data-tip={tip}
      tabIndex={0}
      role="status"
      aria-label={label}
    >
      <span className="v-dot" aria-hidden="true" />
      <span
        className="v-pill"
        style={bump > 0 ? { animationName: bump % 2 ? "vflashA" : "vflashB" } : undefined}
      >
        {count === null ? <span className="v-skel" aria-hidden="true" /> : <RollingNumber value={count} />}
        <span className="v-label">visitors</span>
      </span>
      {bump > 0 && (
        <span key={bump} className="v-plus" aria-hidden="true">
          +{delta}
        </span>
      )}
    </div>
  );
}

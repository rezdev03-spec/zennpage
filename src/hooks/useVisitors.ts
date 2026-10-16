import { useEffect, useState } from "react";
import { VISITORS } from "../config/site";
import { fetchCount, hitCount } from "../lib/visitors";

const CACHE_KEY = "zenn:visitors:last";
const SEEN_KEY = "zenn:visitors:counted-at";

export type VisitorStatus = "loading" | "live" | "offline";

export interface VisitorState {
  /** Real total from the server (or the last real value seen). null = nothing known yet. */
  count: number | null;
  status: VisitorStatus;
  /** Increments each time the total grows while the page is open (drives the "+n" pop). */
  bump: number;
  /** How many visitors arrived in the most recent bump. */
  delta: number;
}

const store = {
  get(key: string): string | null {
    try {
      return window.localStorage.getItem(key);
    } catch {
      return null;
    }
  },
  set(key: string, value: string) {
    try {
      window.localStorage.setItem(key, value);
    } catch {
      /* private mode / storage disabled — safe to ignore */
    }
  },
};

const isLocalDev = () =>
  ["localhost", "127.0.0.1", "[::1]", ""].includes(window.location.hostname) ||
  window.location.hostname.endsWith(".local");

/** Should this page load register a new visitor? (never while developing locally) */
function shouldCount(): boolean {
  if (isLocalDev()) return false;
  const seen = Number(store.get(SEEN_KEY));
  if (!seen) return true;
  const hours = VISITORS.recountAfterHours;
  return hours !== null && Date.now() - seen > hours * 3_600_000;
}

function readCache(): number | null {
  const raw = store.get(CACHE_KEY);
  const n = raw === null ? NaN : Number(raw);
  return Number.isFinite(n) && n >= 0 ? n : null;
}

// One bootstrap per page load, even under React StrictMode's double effect.
let boot: Promise<number> | null = null;
function bootstrap(): Promise<number> {
  if (!boot) {
    const counting = shouldCount();
    boot = (counting ? hitCount() : fetchCount())
      .then((value) => {
        if (counting) store.set(SEEN_KEY, String(Date.now()));
        return value;
      })
      .catch((err) => {
        boot = null; // allow a retry on the next poll
        throw err;
      });
  }
  return boot;
}

export function useVisitors(): VisitorState {
  const [state, setState] = useState<VisitorState>(() => ({
    count: readCache(),
    status: "loading",
    bump: 0,
    delta: 0,
  }));

  useEffect(() => {
    let alive = true;

    const apply = (value: number) => {
      if (!alive) return;
      store.set(CACHE_KEY, String(value));
      setState((s) => {
        const grew = s.count !== null && value > s.count;
        return {
          count: value,
          status: "live",
          bump: grew ? s.bump + 1 : s.bump,
          delta: grew ? value - (s.count ?? value) : s.delta,
        };
      });
    };
    const fail = () => {
      if (alive) setState((s) => ({ ...s, status: "offline" }));
    };

    const poll = () => {
      if (document.hidden) return;
      (boot ? fetchCount() : bootstrap()).then(apply).catch(fail);
    };

    bootstrap().then(apply).catch(fail);
    const timer = window.setInterval(poll, VISITORS.pollMs);
    const onVisible = () => {
      if (!document.hidden) poll();
    };
    document.addEventListener("visibilitychange", onVisible);
    window.addEventListener("online", poll);

    return () => {
      alive = false;
      window.clearInterval(timer);
      document.removeEventListener("visibilitychange", onVisible);
      window.removeEventListener("online", poll);
    };
  }, []);

  return state;
}

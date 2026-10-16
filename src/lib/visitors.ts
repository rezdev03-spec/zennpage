/**
 * Tiny client for the Abacus counter API (free, CORS-enabled, no key).
 *   GET /hit/:namespace/:key  → increments and returns { value }
 *   GET /get/:namespace/:key  → returns { value } (404 until the first hit)
 * Numbers are never invented: on any failure these helpers throw and the UI
 * falls back to the last real value it saw.
 */
import { VISITORS } from "../config/site";

const BASE = "https://abacus.jasoncameron.dev";
const TIMEOUT_MS = 8000;

async function call(path: string): Promise<number> {
  const ctrl = new AbortController();
  const timer = window.setTimeout(() => ctrl.abort(), TIMEOUT_MS);
  try {
    const res = await fetch(`${BASE}${path}/${VISITORS.namespace}/${VISITORS.key}`, {
      cache: "no-store",
      signal: ctrl.signal,
    });
    if (res.status === 404) return 0; // counter not created yet = zero visitors so far
    if (!res.ok) throw new Error(`counter responded ${res.status}`);
    const json: unknown = await res.json();
    const value = Number((json as { value?: unknown })?.value);
    if (!Number.isFinite(value) || value < 0) throw new Error("unexpected counter payload");
    return Math.floor(value);
  } finally {
    window.clearTimeout(timer);
  }
}

/** Register this browser as a visitor and return the new total. */
export const hitCount = () => call("/hit");

/** Read the current total without changing it. */
export const fetchCount = () => call("/get");

import { ZennMark } from "./ZennMark";

/**
 * Terminal/browser-tab style top bar — glassmorphic with traffic light dots and file tab.
 */
export function TerminalHeader() {
  return (
    <div
      className="reveal glass-surface relative flex items-center justify-between rounded-t-xl border border-[var(--color-border-glass)] px-4 py-2.5 backdrop-blur-xl"
      style={{
        "--d": "0ms",
        background: "rgba(22, 27, 34, 0.65)",
      } as React.CSSProperties}
    >
      {/* Top edge sheen */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-white/[0.12] to-transparent"
      />

      {/* Traffic light dots */}
      <div className="flex items-center gap-2">
        <span className="size-3 rounded-full bg-[#ff5f57] shadow-[0_0_6px_rgba(255,95,87,0.3)]" />
        <span className="size-3 rounded-full bg-[#febc2e] shadow-[0_0_6px_rgba(254,188,46,0.3)]" />
        <span className="size-3 rounded-full bg-[#28c840] shadow-[0_0_6px_rgba(40,200,64,0.3)]" />
      </div>

      {/* File tab — inner glass */}
      <div className="flex items-center gap-2 rounded-md border border-white/[0.06] bg-white/[0.05] px-3 py-1 backdrop-blur-sm">
        <ZennMark size={14} className="text-[var(--color-accent)]" />
        <span className="font-mono text-[12px] text-[var(--color-text-secondary)]">
          zenn.hub
        </span>
      </div>

      {/* Decorative status indicator */}
      <div className="flex items-center gap-1.5 font-mono text-[11px] text-[var(--color-text-muted)]">
        <span className="size-2 rounded-full bg-[#28c840] shadow-[0_0_6px_rgba(40,200,64,0.5)]" />
        <span className="hidden sm:inline">online</span>
      </div>
    </div>
  );
}

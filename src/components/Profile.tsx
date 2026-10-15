import { SITE } from "../config/site";
import { ZennMark } from "./ZennMark";

/**
 * Centered profile with glassmorphic avatar container.
 */
export function Profile() {
  return (
    <section
      aria-label="Profile"
      className="reveal relative flex flex-col items-center px-4 pt-10 pb-6"
      style={{ "--d": "80ms" } as React.CSSProperties}
    >
      {/* Avatar — glass ring + white card */}
      <div className="relative mb-5">
        {/* Outer glass ring */}
        <div className="absolute -inset-2.5 rounded-[30px] border border-white/[0.1] bg-white/[0.04] backdrop-blur-md" />
        <div className="relative grid size-[110px] place-items-center rounded-[24px] bg-white shadow-[0_8px_40px_rgba(0,0,0,0.35),0_0_60px_rgba(88,166,255,0.08)]">
          {SITE.avatarImage ? (
            <img
              src={SITE.avatarImage}
              alt={`Portrait of ${SITE.handle}`}
              width={110}
              height={110}
              className="size-full rounded-[24px] object-cover"
            />
          ) : (
            <div className="flex items-center gap-1.5">
              <ZennMark size={28} className="text-[var(--color-bg)]" />
              <span className="text-[17px] font-semibold tracking-tight text-[var(--color-bg)]">
                Zenn
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Name */}
      <h1 className="text-center text-[32px] leading-tight font-bold tracking-[-0.02em] text-[var(--color-text-primary)] drop-shadow-[0_1px_8px_rgba(88,166,255,0.12)]">
        {SITE.handle}
      </h1>

      {/* Tagline */}
      <p className="mt-3 font-mono text-[13px] tracking-[0.06em] text-[var(--color-accent)]">
        <span className="text-[var(--color-text-muted)]">// </span>
        {SITE.bio.toUpperCase()}
      </p>
    </section>
  );
}

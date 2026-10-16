import { SITE } from "../config/site";
import { ZennMark } from "./ZennMark";

/** Avatar tile, name and `// TAGLINE`. */
export function Profile() {
  return (
    <section aria-label="Profile" className="hero reveal" style={{ "--d": "60ms" } as React.CSSProperties}>
      <div className="avatar">
        {SITE.avatarImage ? (
          <img src={SITE.avatarImage} alt={`Portrait of ${SITE.handle}`} width={100} height={100} />
        ) : (
          <span className="avatar-brand">
            <ZennMark size={26} />
            <span>Zenn</span>
          </span>
        )}
      </div>

      <h1 className="name">{SITE.handle}</h1>

      <p className="tagline">
        <i>//</i>
        {SITE.bio}
      </p>
    </section>
  );
}

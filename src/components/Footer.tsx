import { SITE } from "../config/site";
import { ArrowUpIcon } from "./icons";

export function Footer() {
  const year = new Date().getFullYear();

  const backToTop = () => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" });
  };

  return (
    <footer className="foot reveal" style={{ "--d": "680ms" } as React.CSSProperties}>
      <p>
        © {year} {SITE.handle} · Built with curiosity.
      </p>
      <button type="button" className="totop" onClick={backToTop} aria-label="Back to top">
        <ArrowUpIcon size={16} />
      </button>
    </footer>
  );
}

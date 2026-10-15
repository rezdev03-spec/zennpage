import { TerminalHeader } from "./components/TerminalHeader";
import { FloatingLogos } from "./components/FloatingLogos";
import { Profile } from "./components/Profile";
import { CodeBlock } from "./components/CodeBlock";
import { TagLine } from "./components/TagLine";
import { SectionHeading } from "./components/SectionHeading";
import { SocialLinks } from "./components/SocialLinks";
import { Projects } from "./components/Projects";
import { TechStack } from "./components/TechStack";
import { Footer } from "./components/Footer";

export default function App() {
  return (
    <div className="relative min-h-dvh">
      <div className="relative z-10 mx-auto w-full max-w-[520px] px-4 pt-4 pb-2 sm:px-6">
        {/* Terminal bar */}
        <TerminalHeader />

        {/* Hero — floating logos behind a glass overlay */}
        <div
          className="relative overflow-hidden rounded-b-xl border-x border-b border-[var(--color-border-glass)]"
          style={{ background: "linear-gradient(170deg, #0f1923 0%, #101820 40%, #0d1117 100%)" }}
        >
          <FloatingLogos />
          {/* Glass frost layer over the floating logos */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 backdrop-blur-[2px]"
            style={{ background: "rgba(13, 17, 23, 0.22)" }}
          />
          <Profile />
        </div>

        {/* Code block */}
        <div className="mt-5">
          <CodeBlock />
        </div>

        {/* Tags */}
        <TagLine />

        {/* Social links */}
        <div className="mt-10">
          <SectionHeading title="mau explore apa hari ini?" delay={300} />
          <SocialLinks />
        </div>

        {/* Projects */}
        <div className="mt-10">
          <SectionHeading icon="◆" title="Zenn Projects" delay={490} />
          <Projects />
        </div>

        {/* Tech stack */}
        <div className="mt-10">
          <SectionHeading icon="⬡" title="Tech I Explore" delay={650} />
          <TechStack />
        </div>

        {/* Footer */}
        <Footer />
      </div>
    </div>
  );
}

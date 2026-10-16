import { useRef } from "react";
import { usePerfMode } from "./hooks/usePerfMode";
import { TerminalHeader } from "./components/TerminalHeader";
import { FloatingLogos } from "./components/FloatingLogos";
import { Profile } from "./components/Profile";
import { CodeBlock } from "./components/CodeBlock";
import { TagLine } from "./components/TagLine";
import { SocialLinks } from "./components/SocialLinks";
import { Projects } from "./components/Projects";
import { Accuracy } from "./components/Accuracy";
import { TechStack } from "./components/TechStack";
import { Footer } from "./components/Footer";

export default function App() {
  const col = useRef<HTMLDivElement>(null);
  usePerfMode(col);
  return (
    <div className="col" ref={col}>
      <TerminalHeader />
      <div className="stage">
        <FloatingLogos />
        <main className="content">
          <Profile />
          <CodeBlock />
          <TagLine />
          <SocialLinks />
          <Projects />
          <Accuracy />
          <TechStack />
          <Footer />
        </main>
      </div>
    </div>
  );
}

import { InteractiveNavigation } from "./components/InteractiveNavigation";
import { IntroSection } from "./components/sections/IntroSection";
import { ScrollTransitionSection } from "./components/sections/ScrollTransitionSection";
import { ShowcaseSection } from "./components/sections/ShowcaseSection";
import { ProjectCTASection } from "./components/sections/ProjectCTASection";
import { InteractiveFooter } from "./components/sections/InteractiveFooter";

export default function App() {
  return (
    <div className="min-h-screen bg-black overflow-x-hidden">
      <InteractiveNavigation />
      <IntroSection />
      <ScrollTransitionSection />
      <ShowcaseSection />
      <ProjectCTASection />
      <InteractiveFooter />
    </div>
  );
}

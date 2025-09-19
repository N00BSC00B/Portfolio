import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Navbar } from "../components/layout/Navbar";
import { HeroSection } from "../components/sections/HeroSection";
import { AboutSection } from "../components/sections/AboutSection";
import { SkillsSection } from "../components/sections/SkillsSection";
import { ProjectsSection } from "../components/sections/ProjectsSection";
import { ContactSection } from "../components/sections/ContactSection";
import { Footer } from "../components/layout/Footer";
import { ExperienceSection } from "../components/sections/ExperienceSection";
import { FloatingMenu } from "../components/navigation/FloatingMenu";
import { PageLoader } from "../components/layout/PageLoader";
import { CursorTrail } from "../components/effects/CursorTrail";
import { Background } from "../components/effects/Background";
import { ClickRipple } from "../components/effects/ClickRipple";
import { themeManager } from "../utils/themeManager";

export const Home = () => {
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Initialize theme manager for dynamic manifest colors
    themeManager.init();

    // Simulate loading time
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!isLoading && location.hash) {
      const id = location.hash.replace("#", "");
      const el = document.getElementById(id);
      if (el) {
        setTimeout(() => {
          el.scrollIntoView({ behavior: "smooth", block: "start" });
        }, 100);
      }
    }
  }, [location, isLoading]);

  return (
    <>
      <PageLoader
        isLoading={isLoading}
        onLoadingComplete={() => setIsLoading(false)}
      />

      {!isLoading && (
        <div className="min-h-screen custom-scrollbar bg-background text-foreground overflow-x-hidden">
          {/* Click/Touch Ripple Effect */}
          <ClickRipple />

          {/* Cursor Trail Effect (Desktop only) */}
          <CursorTrail />

          {/* Modern Background */}
          <Background />

          {/* Navbar */}
          <Navbar />

          {/* Main Content */}
          <main>
            <HeroSection />
            <AboutSection />
            <SkillsSection />
            <ProjectsSection />
            <ExperienceSection />
            <ContactSection />
          </main>

          {/* Footer */}
          <Footer />

          {/* Floating Action Menu */}
          <FloatingMenu />
        </div>
      )}
    </>
  );
};

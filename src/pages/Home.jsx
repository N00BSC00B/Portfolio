import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Navbar } from "../components/Navbar";
import { ModernBackground } from "../components/ModernBackground";
import { HeroSection } from "../components/HeroSection";
import { AboutSection } from "../components/AboutSection";
import { SkillsSection } from "../components/SkillsSection";
import { ProjectsSection } from "../components/ProjectsSection";
import { ContactSection } from "../components/ContactSection";
import { Footer } from "../components/Footer";
import { ExperienceSection } from "../components/ExperienceSection";
import { FloatingActionMenu } from "../components/FloatingActionMenu";
import { ModernLoader } from "../components/ModernLoader";
import { CursorTrail } from "../components/CursorTrail";
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
      <ModernLoader
        isLoading={isLoading}
        onLoadingComplete={() => setIsLoading(false)}
      />

      {!isLoading && (
        <div className="min-h-screen custom-scrollbar bg-background text-foreground overflow-x-hidden">
          {/* Cursor Trail Effect */}
          <CursorTrail />

          {/* Modern Background */}
          <ModernBackground />

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
          <FloatingActionMenu />
        </div>
      )}
    </>
  );
};

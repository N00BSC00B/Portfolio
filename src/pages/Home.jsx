import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Navbar } from "../components/Navbar";
import { ThemeToggle } from "../components/ThemeToggle";
import { StarBackground } from "@/components/StarBackground";
import { HeroSection } from "../components/HeroSection";
import { AboutSection } from "../components/AboutSection";
import { SkillsSection } from "../components/SkillsSection";
import { ProjectsSection } from "../components/ProjectsSection";
import { ContactSection } from "../components/ContactSection";
import { Footer } from "../components/Footer";
import { ExperienceSection } from "../components/ExperienceSection";

export const Home = () => {
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      const id = location.hash.replace("#", "");
      const el = document.getElementById(id);
      if (el) {
        setTimeout(() => {
          el.scrollIntoView({ behavior: "smooth", block: "start" });
        }, 100); // small delay ensures DOM is ready
      }
    }
  }, [location]);

  return (
    <div className="min-h-screen custom-scrollbar bg-background text-foreground overflow-x-hidden">
      {/* Theme Toggle */}
      <ThemeToggle />

      {/* Star Background */}
      <StarBackground />

      {/* Navbar */}
      <Navbar />

      {/* Main Content */}
      <main>
        <HeroSection />
        <AboutSection />
        <SkillsSection />
        <ExperienceSection />
        <ProjectsSection />
        <ContactSection />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

"use client";

import { useEffect, useState } from "react";
import { ModernBackground } from "./ModernBackground";
import { Navbar } from "./Navbar";
import { HeroSection } from "./HeroSection";
import { AboutSection } from "./AboutSection";
import { SkillsSection } from "./SkillsSection";
import { ProjectsSection } from "./ProjectsSection";
import { ExperienceSection } from "./ExperienceSection";
import { ContactSection } from "./ContactSection";
import { Footer } from "./Footer";
import { FloatingActionMenu } from "./FloatingActionMenu";
import { ModernLoader } from "./ModernLoader";
import { CursorTrail } from "./CursorTrail";
import { ClickEffect } from "./ClickEffect";
import { Toaster } from "./ui/toaster";
import { themeManager } from "../utils/themeManager";

export const HomePage = () => {
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
    if (!isLoading) {
      // Handle URL hash navigation after loading
      const hash = window.location.hash;
      if (hash) {
        const id = hash.replace("#", "");
        const el = document.getElementById(id);
        if (el) {
          setTimeout(() => {
            el.scrollIntoView({ behavior: "smooth", block: "start" });
          }, 100);
        }
      }
    }
  }, [isLoading]);

  return (
    <>
      <Toaster />
      <ModernLoader
        isLoading={isLoading}
        onLoadingComplete={() => setIsLoading(false)}
      />

      {!isLoading && (
        <div className="min-h-screen custom-scrollbar bg-background text-foreground overflow-x-hidden">
          {/* Cursor Trail Effect */}
          <CursorTrail />

          {/* Click Effect */}
          <ClickEffect />

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

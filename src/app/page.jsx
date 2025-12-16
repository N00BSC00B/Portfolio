"use client";

import { useEffect, useState } from "react";
// import { useLocation } from "react-router-dom"; // Replaced by usePathname/hash check if needed, or just plain window logic for hash
import { Navbar } from "@/components/layout/Navbar";
import { HeroSection } from "@/components/sections/HeroSection";
import { Footer } from "@/components/layout/Footer";
import { FloatingMenu } from "@/components/navigation/FloatingMenu";
import { CursorTrail } from "@/components/effects/CursorTrail";
import { Background } from "@/components/effects/Background";
import { ClickRipple } from "@/components/effects/ClickRipple";
import { themeManager } from "@/utils/themeManager";
import dynamic from "next/dynamic";

// Lazy load below-the-fold sections to reduce initial bundle size
const AboutSection = dynamic(() =>
  import("@/components/sections/AboutSection").then((mod) => mod.AboutSection)
);
const SkillsSection = dynamic(() =>
  import("@/components/sections/SkillsSection").then((mod) => mod.SkillsSection)
);
const ProjectsSection = dynamic(() =>
  import("@/components/sections/ProjectsSection").then(
    (mod) => mod.ProjectsSection
  )
);
const ContactSection = dynamic(() =>
  import("@/components/sections/ContactSection").then(
    (mod) => mod.ContactSection
  )
);
const ExperienceSection = dynamic(() =>
  import("@/components/sections/ExperienceSection").then(
    (mod) => mod.ExperienceSection
  )
);

export default function Home() {
  // const location = useLocation(); // Not available in Next.js Page without hook
  // In Next.js, hash handling is usually automatic or manual via window

  useEffect(() => {
    // Initialize theme manager
    if (typeof themeManager !== "undefined" && themeManager.init) {
      themeManager.init();
    }
  }, []);

  useEffect(() => {
    // Handle hash scrolling on mount
    if (typeof window !== "undefined" && window.location.hash) {
      const id = window.location.hash.replace("#", "");
      const el = document.getElementById(id);
      if (el) {
        setTimeout(() => {
          el.scrollIntoView({ behavior: "smooth", block: "start" });
        }, 100);
      }
    }
  }, []);

  return (
    <>
      <div className="min-h-screen bg-background text-foreground">
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
    </>
  );
}

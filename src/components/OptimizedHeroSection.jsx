/**
 * Optimized HeroSection - Performance-first alternative using lightweight animations
 * Replaces Framer Motion with CSS transitions and Intersection Observer
 */

import { useEffect } from "react";
import LightScrollReveal from "./LightScrollReveal";
import LightTypewriterEffect from "./LightTypewriterEffect";
import { GlassmorphismCard } from "./GlassmorphismCard";
import { useHoverAnimation, useAnimationConfig } from "../hooks/useAnimations";

export const OptimizedHeroSection = () => {
  const config = useAnimationConfig();

  const roles = [
    "Full-Stack Developer",
    "Automation & AI Developer",
    "Cross-Platform Developer",
    "Backend & API Specialist",
  ];

  const profileImageRef = useHoverAnimation({
    scale: 1.05,
    translateY: -5,
    duration: config.duration.medium,
  });

  const ctaButtonRef = useHoverAnimation({
    scale: 1.05,
    translateY: -2,
    duration: config.duration.fast,
  });

  // Inject CSS animations
  useEffect(() => {
    const styleId = "hero-animations";
    if (document.getElementById(styleId)) return;

    const style = document.createElement("style");
    style.id = styleId;
    style.textContent = `
      @keyframes ring-float {
        0% { transform: rotate(0deg) scale(1); }
        50% { transform: rotate(180deg) scale(1.1); }
        100% { transform: rotate(360deg) scale(1); }
      }

      @keyframes ring-float-simple {
        0%, 100% { transform: scale(1); }
        50% { transform: scale(1.05); }
      }

      @keyframes float-up {
        0%, 100% { transform: translateY(0) scale(1); opacity: 0.3; }
        50% { transform: translateY(-20px) scale(1.2); opacity: 1; }
      }

      @keyframes float-simple {
        0%, 100% { transform: translateY(0); opacity: 0.3; }
        50% { transform: translateY(-10px); opacity: 0.8; }
      }

      .floating-dot {
        animation-iteration-count: infinite;
      }

      .ring-float {
        animation: ring-float 10s linear infinite;
      }

      .ring-float-simple {
        animation: ring-float-simple 5s ease-in-out infinite;
      }

      .float-up {
        animation: float-up 4s ease-in-out infinite;
      }

      .float-simple {
        animation: float-simple 3s ease-in-out infinite;
      }
    `;
    document.head.appendChild(style);

    return () => {
      const existingStyle = document.getElementById(styleId);
      if (existingStyle) {
        existingStyle.remove();
      }
    };
  }, []);

  return (
    <>
      <div className="h-20 w-full flex-shrink-0" />
      <section
        id="hero"
        className="hero-section relative min-h-screen flex flex-col items-start justify-center px-4 md:px-6 lg:px-8 pb-8"
      >
        <div className="container max-w-6xl mx-auto text-left z-10 w-full">
          <div className="md:flex md:items-center md:space-x-8 lg:space-x-12 xl:space-x-16">
            {/* Profile Picture with Optimized Animation */}
            <LightScrollReveal
              direction="scale"
              delay={0}
              duration={config.duration.slow}
              className="relative mb-8 md:mb-0 group cursor-pointer flex-shrink-0"
            >
              <div className="relative w-64 h-64 md:w-80 md:h-80 lg:w-96 lg:h-96 mx-auto md:mx-0">
                <img
                  ref={profileImageRef}
                  src="./image.png"
                  alt="Sayan Barma"
                  className="w-full h-full object-cover rounded-full border-4 border-primary/30 shadow-2xl transition-all duration-500"
                  style={{
                    maxWidth: "min(90vw, 384px)",
                    maxHeight: "min(90vw, 384px)",
                  }}
                />

                {/* CSS-based Floating Ring Animation */}
                <div
                  className={`absolute inset-0 rounded-full border-2 border-primary/50 ${
                    config.canUseComplexAnimations
                      ? "ring-float"
                      : "ring-float-simple"
                  }`}
                />

                {/* Glow Effect */}
                <div className="absolute inset-0 rounded-full bg-primary/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>
            </LightScrollReveal>

            {/* Content Section */}
            <div className="space-y-6 md:w-2/3 lg:w-3/5 xl:w-1/2">
              {/* Enhanced Title with Stagger Animation */}
              <LightScrollReveal
                delay={200}
                duration={config.duration.slow}
                className="text-3xl md:text-5xl font-bold tracking-tight"
              >
                <div className="space-y-2">
                  <div>
                    <span className="inline-block">Hi, I&apos;m</span>
                  </div>
                  <div>
                    <span className="text-primary inline-block">Sayan</span>
                    <span className="text-gradient inline-block ml-2 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                      Barma
                    </span>
                  </div>
                </div>
              </LightScrollReveal>

              {/* Dynamic Typewriter Effect */}
              <LightScrollReveal
                delay={400}
                duration={config.duration.medium}
                className="text-xl md:text-2xl font-semibold text-primary"
              >
                <LightTypewriterEffect words={roles} />
              </LightScrollReveal>

              {/* Enhanced Description */}
              <LightScrollReveal delay={600} duration={config.duration.medium}>
                <GlassmorphismCard className="p-6">
                  <p className="text-base md:text-lg text-muted-foreground max-w-2xl leading-relaxed">
                    Passionate about crafting{" "}
                    <span className="text-primary font-semibold">
                      secure and scalable applications
                    </span>
                    . I build intuitive user experiences and robust systems
                    across various domains, from real-time communication and AI
                    assistants to data scraping and desktop GUIs.
                  </p>
                </GlassmorphismCard>
              </LightScrollReveal>

              {/* Enhanced CTA Button */}
              <LightScrollReveal
                delay={800}
                duration={config.duration.medium}
                className="pt-4"
              >
                <a
                  ref={ctaButtonRef}
                  href="#projects"
                  className="group relative inline-flex items-center px-8 py-4 text-lg font-semibold text-white bg-gradient-to-r from-primary to-purple-600 rounded-full overflow-hidden transition-all duration-300 hover:shadow-2xl hover:shadow-primary/25"
                >
                  <span className="relative z-10">View My Work</span>

                  {/* CSS-based Animated Background */}
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-300" />

                  {/* Shimmer Effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />

                  {/* Arrow Icon */}
                  <svg
                    className="ml-2 w-5 h-5 relative z-10 group-hover:translate-x-1 transition-transform duration-300"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 8l4 4m0 0l-4 4m4-4H3"
                    />
                  </svg>
                </a>
              </LightScrollReveal>
            </div>
          </div>
        </div>

        {/* CSS-based Floating Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(config.canUseComplexAnimations ? 5 : 3)].map((_, i) => (
            <div
              key={i}
              className={`absolute w-2 h-2 bg-primary/30 rounded-full floating-dot ${
                config.canUseComplexAnimations ? "float-up" : "float-simple"
              }`}
              style={{
                left: `${20 + i * 15}%`,
                top: `${50 + i * 10}%`,
                animationDelay: `${i * 0.5}s`,
              }}
            />
          ))}
        </div>
      </section>
    </>
  );
};

export default OptimizedHeroSection;

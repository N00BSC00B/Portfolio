"use client";
"use client";

import { motion } from "framer-motion";

import { ScrollingRoles } from "../effects/ScrollingRoles";
import { GlassmorphismCard } from "../ui/GlassmorphismCard";
import { useAnimationConfig } from "@/hooks/useAnimations";
import { useScrollReveal } from "@/hooks/useAnimations";

export const HeroSection = () => {
  const { isLowPerformance } = useAnimationConfig();
  const titleRef = useScrollReveal();
  const roles = [
    "Full-Stack Developer",
    "Automation & AI Developer",
    "Cross-Platform Developer",
    "Backend & API Specialist",
  ];

  const heroImage = (
    <div className="relative group">
      {/* Animated Background Circles - Only for high performance */}
      {!isLowPerformance && (
        <motion.div
          className="absolute inset-0 -m-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
        >
          {/* Large outer circle */}
          <motion.div
            className="absolute inset-0 rounded-full bg-gradient-to-r from-orange-500/10 to-red-500/10 blur-xl"
            animate={{
              scale: [1, 1.2, 1],
              rotate: [0, 180, 360],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "linear",
            }}
          />

          {/* Medium circle */}
          <motion.div
            className="absolute inset-2 rounded-full bg-gradient-to-r from-orange-400/15 to-red-400/15 blur-lg"
            animate={{
              scale: [1.1, 0.9, 1.1],
              rotate: [360, 180, 0],
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />

          {/* Inner circle */}
          <motion.div
            className="absolute inset-4 rounded-full bg-gradient-to-r from-orange-300/20 to-red-300/20 blur-md"
            animate={{
              scale: [0.8, 1.3, 0.8],
              opacity: [0.5, 0.8, 0.5],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        </motion.div>
      )}

      {/* Profile Image */}
      <motion.div
        className="relative z-10 rounded-full border-4 border-orange-500/50 shadow-lg
      w-40 h-40 sm:w-48 sm:h-48 md:w-56 md:h-56 lg:w-80 lg:h-80 xl:w-96 xl:h-96
      overflow-hidden group-hover:scale-105 transition-transform duration-500"
        whileHover={
          !isLowPerformance
            ? {
                scale: 1.05,
                boxShadow: "0 20px 40px rgba(249, 115, 22, 0.3)",
              }
            : {}
        }
        style={{
          maxWidth: "min(90vw, 384px)",
          maxHeight: "min(90vw, 384px)",
        }}
      >
        <motion.img
          src="./hero.jpg"
          alt="Sayan Barma"
          className="w-full h-full object-cover"
        />
      </motion.div>

      {/* Floating Ring Animation - Only for high performance */}
      {!isLowPerformance && (
        <motion.div
          className="absolute inset-0 rounded-full border-2 border-orange-500/50 z-20"
          animate={{
            rotate: 360,
            scale: [1, 1.1, 1],
          }}
          transition={{
            rotate: { duration: 10, repeat: Infinity, ease: "linear" },
            scale: { duration: 2, repeat: Infinity, ease: "easeInOut" },
          }}
        />
      )}

      {/* Glow Effect */}
      <div className="absolute inset-0 rounded-full bg-orange-500/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-pulse z-5" />
    </div>
  );

  return (
    <>
      <div className="h-20 w-full flex-shrink-0" />
      <section
        id="hero"
        className="hero-section relative min-h-screen flex flex-col items-start justify-center px-4 md:px-6 lg:px-8 pb-8"
      >
        <div className="container max-w-6xl mx-auto text-left z-10 w-full">
          <div className="md:flex md:items-center md:space-x-8 lg:space-x-12 xl:space-x-16">
            {/* Profile Picture Container */}
            <motion.div
              className="flex-shrink-0 mb-6 sm:mb-8 md:mb-0 md:w-1/3 lg:w-2/5 xl:w-1/2 flex justify-center md:justify-start"
              initial={
                isLowPerformance
                  ? { opacity: 1 }
                  : { opacity: 0, scale: 0.5, rotateY: -90 }
              }
              animate={{ opacity: 1, scale: 1, rotateY: 0 }}
              transition={{ duration: 1, ease: "easeOut" }}
            >
              {heroImage}
            </motion.div>

            <div
              className="space-y-6 md:w-2/3 lg:w-3/5 xl:w-1/2"
              ref={titleRef}
            >
              {/* Enhanced Title with Stagger Animation */}
              <motion.h1
                className="text-3xl md:text-5xl font-bold tracking-tight"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
              >
                <motion.span
                  className="inline-block"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2, duration: 0.6 }}
                >
                  Hi, I&#39;m
                </motion.span>
                <br />
                <motion.span
                  className="text-primary inline-block"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4, duration: 0.6 }}
                >
                  Sayan
                </motion.span>
                <motion.span
                  className="text-gradient inline-block ml-2 bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.6, duration: 0.6 }}
                >
                  Barma
                </motion.span>
              </motion.h1>

              {/* Dynamic Scrolling Roles */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8, duration: 0.6 }}
              >
                <ScrollingRoles roles={roles} interval={2500} />
              </motion.div>

              {/* Enhanced Description */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1, duration: 0.6 }}
              >
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
              </motion.div>

              {/* Enhanced CTA Button */}
              <motion.div
                className="pt-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.2, duration: 0.6 }}
              >
                <motion.a
                  href="#projects"
                  className="group relative inline-flex items-center px-8 py-4 text-lg font-semibold text-white bg-gradient-to-r from-[#FF6B6B] to-orange-500 rounded-full overflow-hidden transition-all duration-300 hover:shadow-2xl hover:shadow-[#FF6B6B]/25"
                  whileHover={!isLowPerformance ? { scale: 1.05, y: -2 } : {}}
                  whileTap={!isLowPerformance ? { scale: 0.95 } : {}}
                >
                  <span className="relative z-10">View My Work</span>

                  {/* Animated Background - Only high perf */}
                  {!isLowPerformance && (
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-orange-500 to-red-500"
                      initial={{ x: "-100%" }}
                      whileHover={{ x: 0 }}
                      transition={{ duration: 0.3 }}
                    />
                  )}

                  {/* Shimmer Effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />

                  {/* Arrow Icon */}
                  <motion.svg
                    className="ml-2 w-5 h-5 relative z-10"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    initial={{ x: 0 }}
                    whileHover={!isLowPerformance ? { x: 5 } : {}}
                    transition={{ duration: 0.3 }}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 8l4 4m0 0l-4 4m4-4H3"
                    />
                  </motion.svg>
                </motion.a>
              </motion.div>
            </div>
          </div>
        </div>

        {/* Floating Elements - Only high perf */}
        {!isLowPerformance && (
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {[...Array(5)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-2 h-2 bg-primary/30 rounded-full"
                style={{
                  left: `${20 + i * 15}%`,
                  top: `${20 + i * 10}%`,
                }}
                animate={{
                  y: [0, -30, 0],
                  opacity: [0.3, 1, 0.3],
                  scale: [1, 1.5, 1],
                }}
                transition={{
                  duration: 3 + i,
                  repeat: Infinity,
                  delay: i * 0.5,
                }}
              />
            ))}
          </div>
        )}
      </section>
    </>
  );
};

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import PropTypes from "prop-types";

export const ModernLoader = ({ isLoading, onLoadingComplete }) => {
  const [progress, setProgress] = useState(0);
  const [loadingStage, setLoadingStage] = useState(0);

  const loadingStages = [
    "Initializing...",
    "Loading components...",
    "Preparing animations...",
    "Almost ready...",
    "Welcome!",
  ];

  useEffect(() => {
    if (isLoading) {
      const interval = setInterval(() => {
        setProgress((prev) => {
          const newProgress = Math.min(prev + Math.random() * 12 + 3, 100);

          // Update loading stage based on progress
          if (newProgress >= 80) setLoadingStage(4);
          else if (newProgress >= 60) setLoadingStage(3);
          else if (newProgress >= 40) setLoadingStage(2);
          else if (newProgress >= 20) setLoadingStage(1);

          if (newProgress >= 100) {
            clearInterval(interval);
            setTimeout(() => onLoadingComplete?.(), 800);
          }
          return newProgress;
        });
      }, 150);

      return () => clearInterval(interval);
    }
  }, [isLoading, onLoadingComplete]);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{
            opacity: 0,
            scale: 0.9,
            filter: "blur(10px)",
          }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-background via-background/98 to-background overflow-hidden"
        >
          {/* Animated Background */}
          <div className="absolute inset-0">
            {/* Gradient Orbs */}
            <motion.div
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.3, 0.6, 0.3],
                rotate: [0, 180, 360],
              }}
              transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
              className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-primary/30 to-orange-500/30 rounded-full blur-3xl"
            />
            <motion.div
              animate={{
                scale: [1.2, 1, 1.2],
                opacity: [0.4, 0.7, 0.4],
                rotate: [360, 180, 0],
              }}
              transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
              className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-to-r from-orange-500/30 to-red-500/30 rounded-full blur-3xl"
            />

            {/* Grid Pattern */}
            <div
              className="absolute inset-0 opacity-[0.03]"
              style={{
                backgroundImage: `
                  linear-gradient(rgba(59, 130, 246, 0.5) 1px, transparent 1px),
                  linear-gradient(90deg, rgba(59, 130, 246, 0.5) 1px, transparent 1px)
                `,
                backgroundSize: "50px 50px",
              }}
            />
          </div>

          <div className="relative flex flex-col items-center space-y-8 z-10">
            {/* Enhanced Logo/Avatar */}
            <motion.div
              initial={{ scale: 0, rotate: -180, opacity: 0 }}
              animate={{ scale: 1, rotate: 0, opacity: 1 }}
              transition={{ duration: 1.2, ease: "easeOut" }}
              className="relative"
            >
              {/* Main Avatar */}
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="relative w-32 h-32 rounded-full overflow-hidden border-4 border-primary/50 shadow-2xl"
              >
                <img
                  src="/favicon.jpg"
                  alt="Sayan Barma"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent" />
              </motion.div>

              {/* Rotating Ring */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0 rounded-full border-2 border-dashed border-primary/40"
              />

              {/* Outer Pulse Ring */}
              <motion.div
                animate={{
                  scale: [1, 1.3, 1],
                  opacity: [0.5, 0, 0.5],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="absolute inset-0 rounded-full border border-primary/60"
              />
            </motion.div>

            {/* Enhanced Loading Text */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              className="text-center space-y-4"
            >
              <motion.h1
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-primary via-orange-500 to-red-500 bg-clip-text text-transparent"
              >
                Sayan Barma
              </motion.h1>

              <motion.p
                key={loadingStage}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="text-lg text-muted-foreground font-medium"
              >
                {loadingStages[loadingStage]}
              </motion.p>
            </motion.div>

            {/* Enhanced Progress Section */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.8, duration: 0.6 }}
              className="flex flex-col items-center space-y-4"
            >
              {/* Progress Bar */}
              <div className="relative w-80 h-3 bg-muted/50 rounded-full overflow-hidden backdrop-blur-sm border border-border/50">
                <motion.div
                  className="h-full bg-gradient-to-r from-primary via-orange-500 to-red-500 rounded-full relative"
                  style={{ width: `${progress}%` }}
                  transition={{ ease: "easeOut", duration: 0.3 }}
                >
                  {/* Shimmer Effect */}
                  <motion.div
                    animate={{ x: ["-100%", "100%"] }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                  />
                </motion.div>
              </div>

              {/* Progress Percentage */}
              <motion.div
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 0.5, repeat: Infinity }}
                className="text-xl font-mono font-bold text-primary"
              >
                {Math.round(progress)}%
              </motion.div>
            </motion.div>

            {/* Floating Particles */}
            {[...Array(12)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute"
                style={{
                  left: `${10 + i * 7}%`,
                  top: `${20 + (i % 3) * 20}%`,
                }}
                animate={{
                  y: [0, -30, 0],
                  x: [0, Math.sin(i) * 20, 0],
                  opacity: [0.2, 1, 0.2],
                  scale: [0.5, 1, 0.5],
                  rotate: [0, 180, 360],
                }}
                transition={{
                  duration: 3 + i * 0.5,
                  repeat: Infinity,
                  delay: i * 0.3,
                  ease: "easeInOut",
                }}
              >
                <div
                  className={`
                  w-2 h-2 rounded-full
                  ${
                    i % 3 === 0
                      ? "bg-primary/60"
                      : i % 3 === 1
                      ? "bg-orange-500/60"
                      : "bg-pink-500/60"
                  }
                `}
                />
              </motion.div>
            ))}

            {/* Loading Dots */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1, duration: 0.6 }}
              className="flex space-x-2"
            >
              {[...Array(3)].map((_, i) => (
                <motion.div
                  key={i}
                  animate={{
                    scale: [1, 1.5, 1],
                    opacity: [0.3, 1, 0.3],
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    delay: i * 0.3,
                  }}
                  className="w-3 h-3 rounded-full bg-gradient-to-r from-primary to-orange-500"
                />
              ))}
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

ModernLoader.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  onLoadingComplete: PropTypes.func,
};

import { motion, AnimatePresence } from "framer-motion";
import { useEffect } from "react";
import PropTypes from "prop-types";

export const PageLoader = ({ isLoading, onLoadingComplete }) => {
  useEffect(() => {
    if (isLoading) {
      // Simulate loading time
      const timer = setTimeout(() => {
        onLoadingComplete?.();
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [isLoading, onLoadingComplete]);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{
            opacity: 0,
            scale: 0.95,
          }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-background"
        >
          {/* Simple Logo */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="mb-8"
          >
            <div className="relative w-20 h-20 rounded-full overflow-hidden border-2 border-orange-500/30">
              <img
                src="/icon-192.png"
                alt="Sayan Barma"
                className="w-full h-full object-cover"
              />
              {/* Rotating border */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "linear",
                }}
                className="absolute inset-0 rounded-full border-2 border-transparent border-t-orange-500"
              />
            </div>
          </motion.div>

          {/* Name */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="text-2xl font-bold text-foreground mb-8"
          >
            Sayan Barma
          </motion.h1>

          {/* Infinite Progress Bar */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="relative w-64 h-1 bg-muted rounded-full overflow-hidden"
          >
            {/* Infinite moving gradient */}
            <motion.div
              animate={{
                x: ["-100%", "100%"],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="absolute top-0 left-0 h-full w-1/2 bg-gradient-to-r from-transparent via-orange-500 to-transparent"
            />

            {/* Secondary wave for smoother effect */}
            <motion.div
              animate={{
                x: ["-100%", "100%"],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 0.7,
              }}
              className="absolute top-0 left-0 h-full w-1/3 bg-gradient-to-r from-transparent via-orange-400/60 to-transparent"
            />
          </motion.div>

          {/* Loading text */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="mt-6 text-sm text-muted-foreground"
          >
            Loading...
          </motion.div>

          {/* Pulsing dots */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.6 }}
            className="flex space-x-1 mt-2"
          >
            {[...Array(3)].map((_, i) => (
              <motion.div
                key={i}
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.5, 1, 0.5],
                }}
                transition={{
                  duration: 1,
                  repeat: Infinity,
                  delay: i * 0.2,
                }}
                className="w-1 h-1 rounded-full bg-orange-500"
              />
            ))}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

PageLoader.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  onLoadingComplete: PropTypes.func,
};

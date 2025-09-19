import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export const ClickRipple = () => {
  const [ripples, setRipples] = useState([]);

  useEffect(() => {
    const createRipple = (x, y) => {
      const ripple = {
        id: Date.now() + Math.random(),
        x,
        y,
      };

      setRipples((prev) => [...prev.slice(-4), ripple]); // Keep max 5 ripples

      // Remove ripple after animation
      setTimeout(() => {
        setRipples((prev) => prev.filter((r) => r.id !== ripple.id));
      }, 600);
    };

    // Handle mouse clicks
    const handleClick = (e) => {
      // Skip if clicking on interactive elements
      const target = e.target;
      const isInteractive =
        target.tagName === "BUTTON" ||
        target.tagName === "A" ||
        target.tagName === "INPUT" ||
        target.tagName === "TEXTAREA" ||
        target.closest("button") ||
        target.closest("a") ||
        target.closest('[role="button"]') ||
        target.closest("[onclick]");

      if (!isInteractive) {
        createRipple(e.clientX, e.clientY);
      }
    };

    // Handle touch events
    const handleTouchStart = (e) => {
      const target = e.target;
      const isInteractive =
        target.tagName === "BUTTON" ||
        target.tagName === "A" ||
        target.closest("button") ||
        target.closest("a") ||
        target.closest('[role="button"]') ||
        target.closest("[onclick]");

      if (!isInteractive && e.touches.length === 1) {
        const touch = e.touches[0];
        createRipple(touch.clientX, touch.clientY);
      }
    };

    // Add event listeners
    document.addEventListener("click", handleClick, { passive: true });
    document.addEventListener("touchstart", handleTouchStart, {
      passive: true,
    });

    return () => {
      document.removeEventListener("click", handleClick);
      document.removeEventListener("touchstart", handleTouchStart);
    };
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-40">
      <AnimatePresence>
        {ripples.map((ripple) => (
          <motion.div
            key={ripple.id}
            className="absolute"
            style={{
              left: ripple.x - 20,
              top: ripple.y - 20,
            }}
            initial={{
              scale: 0,
              opacity: 0.6,
            }}
            animate={{
              scale: 2,
              opacity: 0,
            }}
            exit={{ opacity: 0 }}
            transition={{
              duration: 0.6,
              ease: "easeOut",
            }}
          >
            {/* Outer ripple */}
            <div className="w-10 h-10 border-2 border-orange-500/40 rounded-full shadow-lg shadow-orange-500/20" />

            {/* Inner ripple */}
            <motion.div
              className="absolute inset-2 border border-orange-500/60 rounded-full"
              initial={{ scale: 0, opacity: 0.8 }}
              animate={{ scale: 1.5, opacity: 0 }}
              transition={{
                duration: 0.4,
                ease: "easeOut",
                delay: 0.1,
              }}
            />
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};

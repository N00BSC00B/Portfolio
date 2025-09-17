"use client";

import { useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

export const ClickEffect = () => {
  const [clicks, setClicks] = useState([]);

  const createClickEffect = useCallback((e) => {
    // Get the actual click/touch position
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;

    const newClick = {
      id: Date.now() + Math.random(),
      x: clientX,
      y: clientY,
      timestamp: Date.now(),
    };

    setClicks((prev) => [...prev, newClick]);

    // Remove click effect after animation
    setTimeout(() => {
      setClicks((prev) => prev.filter((click) => click.id !== newClick.id));
    }, 1000);
  }, []);

  useEffect(() => {
    // Add click listeners for both mouse and touch
    const handleClick = (e) => {
      // Only create effect for actual clicks, not just any interaction
      if (e.type === "click" || e.type === "touchstart") {
        createClickEffect(e);
      }
    };

    // Add listeners to document for global click effects
    document.addEventListener("click", handleClick, { passive: true });
    document.addEventListener("touchstart", handleClick, { passive: true });

    return () => {
      document.removeEventListener("click", handleClick);
      document.removeEventListener("touchstart", handleClick);
    };
  }, [createClickEffect]);

  return (
    <div className="fixed inset-0 pointer-events-none z-50">
      <AnimatePresence>
        {clicks.map((click) => (
          <motion.div
            key={click.id}
            className="absolute"
            style={{
              left: click.x - 30,
              top: click.y - 30,
            }}
            initial={{ scale: 0, opacity: 1 }}
            animate={{ scale: 1.8, opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{
              duration: 0.8,
              ease: "easeOut",
            }}
          >
            {/* Outer ripple with orange theme */}
            <motion.div
              className="w-16 h-16 border-4 border-orange-500 rounded-full shadow-xl shadow-orange-500/40"
              initial={{ scale: 0.3, opacity: 1 }}
              animate={{ scale: 2.5, opacity: 0 }}
              transition={{
                duration: 0.8,
                ease: "easeOut",
              }}
            />

            {/* Middle ripple */}
            <motion.div
              className="absolute top-2 left-2 w-12 h-12 border-2 border-red-500/80 rounded-full shadow-lg shadow-red-500/30"
              initial={{ scale: 0.5, opacity: 0.9 }}
              animate={{ scale: 2, opacity: 0 }}
              transition={{
                duration: 0.6,
                ease: "easeOut",
                delay: 0.1,
              }}
            />

            {/* Inner dot with gradient */}
            <motion.div
              className="absolute top-1/2 left-1/2 w-4 h-4 bg-gradient-to-r from-orange-500 to-red-500 rounded-full transform -translate-x-1/2 -translate-y-1/2 shadow-xl shadow-orange-500/60"
              initial={{ scale: 1, opacity: 1 }}
              animate={{ scale: 0, opacity: 0 }}
              transition={{
                duration: 0.5,
                ease: "easeOut",
                delay: 0.15,
              }}
            />

            {/* Enhanced sparkle effects with orange theme */}
            {[...Array(8)].map((_, i) => {
              const angle = i * 45 * (Math.PI / 180);
              const distance = 20 + Math.random() * 15;
              const x = Math.cos(angle) * distance;
              const y = Math.sin(angle) * distance;
              const sparkleColor = i % 2 === 0 ? "bg-orange-500" : "bg-red-500";
              const shadowColor =
                i % 2 === 0 ? "shadow-orange-500/50" : "shadow-red-500/50";

              return (
                <motion.div
                  key={i}
                  className={`absolute w-2 h-2 ${sparkleColor} rounded-full shadow-lg ${shadowColor}`}
                  style={{
                    left: "50%",
                    top: "50%",
                  }}
                  initial={{
                    scale: 0,
                    x: 0,
                    y: 0,
                    opacity: 1,
                  }}
                  animate={{
                    scale: [0, 1.5, 0],
                    x: x,
                    y: y,
                    opacity: [0, 1, 0],
                  }}
                  transition={{
                    duration: 1,
                    ease: "easeOut",
                    delay: 0.2 + i * 0.03,
                  }}
                />
              );
            })}
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};

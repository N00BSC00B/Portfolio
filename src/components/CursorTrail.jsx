"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export const CursorTrail = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Check if it's a touch device
    const isTouchDevice = window.matchMedia("(pointer: coarse)").matches;

    if (isTouchDevice) {
      return; // Don't show cursor trail on touch devices
    }

    const updateMousePosition = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
      setIsVisible(true);
    };

    const hideTrail = () => {
      setIsVisible(false);
    };

    window.addEventListener("mousemove", updateMousePosition);
    window.addEventListener("mouseleave", hideTrail);

    return () => {
      window.removeEventListener("mousemove", updateMousePosition);
      window.removeEventListener("mouseleave", hideTrail);
    };
  }, []);

  // Don't render on touch devices
  if (
    typeof window !== "undefined" &&
    window.matchMedia("(pointer: coarse)").matches
  ) {
    return null;
  }

  return (
    <>
      {/* Main cursor dot */}
      <motion.div
        className="fixed w-4 h-4 bg-gradient-to-r from-orange-500 to-red-500 rounded-full pointer-events-none z-50 shadow-lg shadow-orange-500/50"
        style={{
          left: mousePosition.x - 8,
          top: mousePosition.y - 8,
        }}
        animate={{
          scale: isVisible ? 1 : 0,
          opacity: isVisible ? 0.9 : 0,
        }}
        transition={{
          type: "spring",
          stiffness: 500,
          damping: 28,
        }}
      />

      {/* Trailing circle */}
      <motion.div
        className="fixed w-8 h-8 border-2 border-orange-500 rounded-full pointer-events-none z-50 shadow-md shadow-orange-500/30"
        style={{
          left: mousePosition.x - 16,
          top: mousePosition.y - 16,
        }}
        animate={{
          scale: isVisible ? 1 : 0,
          opacity: isVisible ? 0.7 : 0,
        }}
        transition={{
          type: "spring",
          stiffness: 350,
          damping: 30,
          delay: 0.1,
        }}
      />
    </>
  );
};

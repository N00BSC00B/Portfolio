import { useEffect, useState, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

export const CursorTrail = () => {
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);
  const [touchPositions, setTouchPositions] = useState([]);
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  const animationFrameRef = useRef();
  const lastUpdateTime = useRef(0);

  // Throttled cursor position update for better performance
  const updateCursorPosition = useCallback((e) => {
    const now = Date.now();
    if (now - lastUpdateTime.current < 16) return; // ~60fps throttling

    lastUpdateTime.current = now;

    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
    }

    animationFrameRef.current = requestAnimationFrame(() => {
      setCursorPosition({ x: e.clientX, y: e.clientY });
      setIsVisible(true);
    });
  }, []);

  useEffect(() => {
    // Enhanced device detection with performance considerations
    const checkTouchDevice = () => {
      // Check for reduced motion preference
      const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;
      if (prefersReducedMotion) return true; // Disable cursor trail for reduced motion

      // Check device capabilities
      const lowPerformance =
        navigator.hardwareConcurrency <= 2 || navigator.deviceMemory <= 2;
      if (lowPerformance) return true; // Disable complex animations on low-end devices

      return (
        window.matchMedia("(pointer: coarse)").matches ||
        (navigator.maxTouchPoints > 0 && window.innerWidth < 1024)
      );
    };

    const touchDevice = checkTouchDevice();
    setIsTouchDevice(touchDevice);

    if (!touchDevice) {
      // Desktop cursor trail with optimized performance
      const handleMouseLeave = () => {
        setIsVisible(false);
        if (animationFrameRef.current) {
          cancelAnimationFrame(animationFrameRef.current);
        }
      };

      document.addEventListener("mousemove", updateCursorPosition, {
        passive: true,
      });
      document.addEventListener("mouseleave", handleMouseLeave);

      return () => {
        document.removeEventListener("mousemove", updateCursorPosition);
        document.removeEventListener("mouseleave", handleMouseLeave);
        if (animationFrameRef.current) {
          cancelAnimationFrame(animationFrameRef.current);
        }
      };
    } else {
      // Optimized touch device ripple effect
      const handleTouchStart = (e) => {
        // Limit concurrent touch effects for performance
        if (touchPositions.length >= 3) return;

        const touch = e.touches[0];
        const newTouch = {
          id: Date.now(),
          x: touch.clientX,
          y: touch.clientY,
        };

        setTouchPositions((prev) => [...prev.slice(-2), newTouch]); // Keep max 3 touches

        // Remove touch effect after animation
        setTimeout(() => {
          setTouchPositions((prev) => prev.filter((t) => t.id !== newTouch.id));
        }, 800); // Reduced duration for better performance
      };

      document.addEventListener("touchstart", handleTouchStart, {
        passive: true,
      });

      return () => {
        document.removeEventListener("touchstart", handleTouchStart);
      };
    }
  }, [updateCursorPosition, touchPositions.length]);

  if (isTouchDevice) {
    // Optimized touch ripple effects
    return (
      <AnimatePresence>
        {touchPositions.map((touch) => (
          <motion.div
            key={touch.id}
            className="fixed pointer-events-none z-50"
            style={{
              left: touch.x - 20,
              top: touch.y - 20,
            }}
            initial={{ scale: 0, opacity: 0.6 }}
            animate={{ scale: 1.5, opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{
              duration: 0.8,
              ease: "easeOut",
              type: "tween", // Use tween instead of spring for better mobile performance
            }}
          >
            <div className="w-10 h-10 border-2 border-primary/50 rounded-full" />
          </motion.div>
        ))}
      </AnimatePresence>
    );
  }

  // Optimized desktop cursor trail
  return (
    <div className="cursor-trail">
      {/* Main cursor dot with optimized animations */}
      <motion.div
        className="fixed w-3 h-3 bg-primary/70 rounded-full pointer-events-none z-50 mix-blend-difference"
        style={{
          left: cursorPosition.x - 6,
          top: cursorPosition.y - 6,
        }}
        animate={{
          scale: isVisible ? 1 : 0,
          opacity: isVisible ? 1 : 0,
        }}
        transition={{
          type: "tween",
          duration: 0.15,
          ease: "easeOut",
        }}
      />

      {/* Trailing ring with reduced complexity */}
      <motion.div
        className="fixed w-6 h-6 border border-primary/40 rounded-full pointer-events-none z-50"
        style={{
          left: cursorPosition.x - 12,
          top: cursorPosition.y - 12,
        }}
        animate={{
          scale: isVisible ? 1 : 0,
          opacity: isVisible ? 0.5 : 0,
        }}
        transition={{
          type: "tween",
          duration: 0.2,
          ease: "easeOut",
          delay: 0.05,
        }}
      />
    </div>
  );
};

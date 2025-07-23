import { motion } from "framer-motion";
import { useEffect, useState, useRef, useMemo } from "react";

export const ModernBackground = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isLowPerformance, setIsLowPerformance] = useState(false);
  const mouseUpdateRef = useRef();
  const lastMouseUpdate = useRef(0);

  // Memoized floating elements with performance considerations
  const floatingElements = useMemo(() => {
    const elements = [];
    const elementCount = isLowPerformance ? 5 : 10; // Reduce on low-end devices

    for (let i = 0; i < elementCount; i++) {
      elements.push({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * (isLowPerformance ? 4 : 6) + 2,
        duration: Math.random() * 15 + 10,
        delay: Math.random() * 3,
        opacity: Math.random() * 0.5 + 0.2,
      });
    }
    return elements;
  }, [isLowPerformance]);

  useEffect(() => {
    // Detect low performance devices
    const checkPerformance = () => {
      const isMobile =
        /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
          navigator.userAgent
        );
      const lowMemory = navigator.deviceMemory <= 2;
      const lowConcurrency = navigator.hardwareConcurrency <= 2;
      const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;

      return isMobile || lowMemory || lowConcurrency || prefersReducedMotion;
    };

    setIsLowPerformance(checkPerformance());
  }, []);

  useEffect(() => {
    // Skip mouse tracking on low performance devices
    if (isLowPerformance) return;

    const handleMouseMove = (e) => {
      const now = Date.now();
      if (now - lastMouseUpdate.current < 32) return; // ~30fps throttling for mouse

      lastMouseUpdate.current = now;

      if (mouseUpdateRef.current) {
        cancelAnimationFrame(mouseUpdateRef.current);
      }

      mouseUpdateRef.current = requestAnimationFrame(() => {
        setMousePosition({
          x: (e.clientX / window.innerWidth) * 100,
          y: (e.clientY / window.innerHeight) * 100,
        });
      });
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      if (mouseUpdateRef.current) {
        cancelAnimationFrame(mouseUpdateRef.current);
      }
    };
  }, [isLowPerformance]);

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {/* Gradient Mesh Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50/20 via-purple-50/10 to-cyan-50/20 dark:from-blue-950/20 dark:via-purple-950/10 dark:to-cyan-950/20" />

      {/* Interactive Mouse Glow - Only on high performance devices */}
      {!isLowPerformance && (
        <motion.div
          className="absolute w-64 h-64 rounded-full opacity-30"
          style={{
            background:
              "radial-gradient(circle, rgba(59, 130, 246, 0.15) 0%, transparent 70%)",
            left: `${mousePosition.x}%`,
            top: `${mousePosition.y}%`,
            transform: "translate(-50%, -50%)",
          }}
          transition={{ type: "tween", duration: 0.8, ease: "easeOut" }}
        />
      )}

      {/* Optimized Floating Geometric Elements */}
      {floatingElements.map((element) => (
        <motion.div
          key={element.id}
          className="absolute rounded-full bg-gradient-to-r from-blue-400/15 to-purple-400/15 backdrop-blur-sm"
          style={{
            width: element.size + "px",
            height: element.size + "px",
            left: element.x + "%",
            top: element.y + "%",
            opacity: element.opacity,
          }}
          animate={{
            y: [0, isLowPerformance ? -15 : -30, 0],
            x: [0, isLowPerformance ? 8 : 15, 0],
            scale: [1, isLowPerformance ? 1.05 : 1.1, 1],
            rotate: isLowPerformance ? [0, 180] : [0, 180, 360],
          }}
          transition={{
            duration: element.duration,
            delay: element.delay,
            repeat: Infinity,
            ease: "easeInOut",
            type: "tween",
          }}
        />
      ))}

      {/* Simplified Grid Pattern */}
      <div
        className="absolute inset-0 opacity-[0.02] dark:opacity-[0.03]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(59, 130, 246, 0.3) 1px, transparent 1px),
            linear-gradient(90deg, rgba(59, 130, 246, 0.3) 1px, transparent 1px)
          `,
          backgroundSize: isLowPerformance ? "80px 80px" : "50px 50px",
        }}
      />

      {/* Optimized Animated Gradient Orbs */}
      <motion.div
        className="absolute top-1/4 left-1/4 w-48 h-48 rounded-full opacity-15"
        style={{
          background: "linear-gradient(45deg, #3b82f6, #8b5cf6, #06b6d4)",
          filter: isLowPerformance ? "blur(40px)" : "blur(60px)",
        }}
        animate={{
          scale: isLowPerformance ? [1, 1.1, 1] : [1, 1.2, 1],
          rotate: [0, 360],
        }}
        transition={{
          duration: isLowPerformance ? 15 : 20,
          repeat: Infinity,
          ease: "linear",
        }}
      />

      <motion.div
        className="absolute bottom-1/4 right-1/4 w-32 h-32 rounded-full opacity-10"
        style={{
          background: "linear-gradient(-45deg, #f59e0b, #ef4444, #ec4899)",
          filter: isLowPerformance ? "blur(30px)" : "blur(50px)",
        }}
        animate={{
          scale: isLowPerformance ? [1.1, 1, 1.1] : [1.2, 1, 1.2],
          rotate: [360, 0],
        }}
        transition={{
          duration: isLowPerformance ? 18 : 25,
          repeat: Infinity,
          ease: "linear",
        }}
      />
    </div>
  );
};

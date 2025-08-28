/**
 * Optimized ModernBackground - Performance-first alternative to Framer Motion version
 * Uses CSS animations, optimized mouse tracking, and device-aware rendering
 */

import { useEffect, useState, useRef, useMemo } from "react";
import { getDeviceCapabilities } from "../utils/lightAnimations";

export const ModernBackground = () => {
  const [mousePosition, setMousePosition] = useState({ x: 50, y: 50 });
  const mouseUpdateRef = useRef();
  const lastMouseUpdate = useRef(0);

  const capabilities = getDeviceCapabilities();

  // Memoized floating elements with performance considerations
  const floatingElements = useMemo(() => {
    const elements = [];
    const elementCount = capabilities.isLowPerformance
      ? 3
      : capabilities.canUseComplexAnimations
      ? 8
      : 5;

    for (let i = 0; i < elementCount; i++) {
      elements.push({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * (capabilities.isLowPerformance ? 3 : 5) + 2,
        duration:
          Math.random() * 10 + (capabilities.isLowPerformance ? 20 : 15),
        delay: Math.random() * 3,
        opacity: Math.random() * 0.4 + 0.1,
      });
    }
    return elements;
  }, [capabilities]);

  // Inject CSS animations
  useEffect(() => {
    const styleId = "modern-background-animations";
    if (document.getElementById(styleId)) return;

    const style = document.createElement("style");
    style.id = styleId;
    style.textContent = `
      @keyframes float-element {
        0%, 100% { 
          transform: translate(0, 0) scale(1) rotate(0deg); 
        }
        25% { 
          transform: translate(${
            capabilities.isLowPerformance ? "8px" : "15px"
          }, ${capabilities.isLowPerformance ? "-10px" : "-20px"}) scale(${
      capabilities.isLowPerformance ? "1.05" : "1.1"
    }) rotate(${capabilities.isLowPerformance ? "45deg" : "90deg"}); 
        }
        50% { 
          transform: translate(${
            capabilities.isLowPerformance ? "10px" : "20px"
          }, 0) scale(1) rotate(${
      capabilities.isLowPerformance ? "90deg" : "180deg"
    }); 
        }
        75% { 
          transform: translate(0, ${
            capabilities.isLowPerformance ? "10px" : "20px"
          }) scale(${capabilities.isLowPerformance ? "1.05" : "1.1"}) rotate(${
      capabilities.isLowPerformance ? "135deg" : "270deg"
    }); 
        }
      }

      @keyframes gradient-rotate-1 {
        0%, 100% { transform: rotate(0deg) scale(1); }
        50% { transform: rotate(180deg) scale(${
          capabilities.isLowPerformance ? "1.1" : "1.2"
        }); }
      }

      @keyframes gradient-rotate-2 {
        0%, 100% { transform: rotate(360deg) scale(${
          capabilities.isLowPerformance ? "1.05" : "1.15"
        }); }
        50% { transform: rotate(180deg) scale(1); }
      }

      .bg-float-element {
        animation: float-element var(--duration) ease-in-out infinite;
        animation-delay: var(--delay);
        will-change: ${
          capabilities.canUseComplexAnimations ? "transform" : "auto"
        };
      }

      .bg-gradient-orb-1 {
        animation: gradient-rotate-1 ${
          capabilities.isLowPerformance ? "25s" : "20s"
        } linear infinite;
        will-change: ${
          capabilities.canUseComplexAnimations ? "transform" : "auto"
        };
      }

      .bg-gradient-orb-2 {
        animation: gradient-rotate-2 ${
          capabilities.isLowPerformance ? "30s" : "25s"
        } linear infinite;
        will-change: ${
          capabilities.canUseComplexAnimations ? "transform" : "auto"
        };
      }

      .mouse-glow {
        transition: left 0.8s ease-out, top 0.8s ease-out;
        will-change: ${
          capabilities.canUseComplexAnimations ? "left, top" : "auto"
        };
      }
    `;
    document.head.appendChild(style);

    return () => {
      const existingStyle = document.getElementById(styleId);
      if (existingStyle) {
        existingStyle.remove();
      }
    };
  }, [capabilities]);

  // Optimized mouse tracking
  useEffect(() => {
    if (capabilities.isLowPerformance || capabilities.prefersReducedMotion)
      return;

    const handleMouseMove = (e) => {
      const now = Date.now();
      if (now - lastMouseUpdate.current < 32) return; // 30fps throttling

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
  }, [capabilities]);

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {/* Gradient Mesh Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50/20 via-purple-50/10 to-cyan-50/20 dark:from-blue-950/20 dark:via-purple-950/10 dark:to-cyan-950/20" />

      {/* Interactive Mouse Glow - Only on high performance devices */}
      {capabilities.canUseComplexAnimations && (
        <div
          className="absolute w-64 h-64 rounded-full opacity-30 mouse-glow"
          style={{
            background:
              "radial-gradient(circle, rgba(59, 130, 246, 0.15) 0%, transparent 70%)",
            left: `${mousePosition.x}%`,
            top: `${mousePosition.y}%`,
            transform: "translate(-50%, -50%)",
          }}
        />
      )}

      {/* Optimized Floating Geometric Elements */}
      {floatingElements.map((element) => (
        <div
          key={element.id}
          className="absolute rounded-full bg-gradient-to-r from-blue-400/15 to-purple-400/15 backdrop-blur-sm bg-float-element"
          style={{
            width: element.size + "px",
            height: element.size + "px",
            left: element.x + "%",
            top: element.y + "%",
            opacity: element.opacity,
            "--duration": element.duration + "s",
            "--delay": element.delay + "s",
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
          backgroundSize: capabilities.isLowPerformance
            ? "80px 80px"
            : "50px 50px",
        }}
      />

      {/* Optimized Animated Gradient Orbs */}
      <div
        className="absolute top-1/4 left-1/4 w-48 h-48 rounded-full opacity-15 bg-gradient-orb-1"
        style={{
          background: "linear-gradient(45deg, #3b82f6, #8b5cf6, #06b6d4)",
          filter: capabilities.isLowPerformance ? "blur(40px)" : "blur(60px)",
        }}
      />

      <div
        className="absolute bottom-1/4 right-1/4 w-32 h-32 rounded-full opacity-10 bg-gradient-orb-2"
        style={{
          background: "linear-gradient(-45deg, #f59e0b, #ef4444, #ec4899)",
          filter: capabilities.isLowPerformance ? "blur(30px)" : "blur(50px)",
        }}
      />
    </div>
  );
};

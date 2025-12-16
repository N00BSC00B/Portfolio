"use client";
"use client";

/**
 * Lightweight ModernBackground - High performance alternative to Framer Motion version
 * Uses CSS animations and minimal JavaScript for optimal performance
 */

import { useMouseTracker, useAnimationConfig } from "../../hooks/useAnimations";
import { useState, useEffect, useMemo } from "react";

export const Background = () => {
  const [mousePosition, setMousePosition] = useState({ x: 50, y: 50 });
  const config = useAnimationConfig();

  // State for floating elements to avoid hydration mismatch
  const [floatingElements, setFloatingElements] = useState([]);

  useEffect(() => {
    const elementCount = config.isLowPerformance
      ? 3
      : config.canUseComplexAnimations
      ? 8
      : 5;

    const elements = [];
    for (let i = 0; i < elementCount; i++) {
      elements.push({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * (config.isLowPerformance ? 3 : 5) + 2,
        duration: Math.random() * 10 + 15,
        delay: Math.random() * 2,
        opacity: Math.random() * 0.3 + 0.1,
      });
    }
    setFloatingElements(elements);
  }, [config.isLowPerformance, config.canUseComplexAnimations]);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePosition({
      x: ((e.clientX - rect.left) / rect.width) * 100,
      y: ((e.clientY - rect.top) / rect.height) * 100,
    });
  };

  const mouseTrackerRef = useMouseTracker(handleMouseMove, 32); // 30fps throttling

  // CSS animation styles
  useEffect(() => {
    if (typeof document === "undefined") return;

    const styleId = "light-bg-animations";
    if (document.getElementById(styleId)) return;

    const style = document.createElement("style");
    style.id = styleId;
    style.textContent = `
      @keyframes float-gentle {
        0%, 100% { 
          transform: translate(0, 0) scale(1) rotate(0deg); 
        }
        25% { 
          transform: translate(${config.isLowPerformance ? "5px" : "10px"}, ${
      config.isLowPerformance ? "-8px" : "-15px"
    }) scale(${config.isLowPerformance ? "1.02" : "1.05"}) rotate(${
      config.isLowPerformance ? "45deg" : "90deg"
    }); 
        }
        50% { 
          transform: translate(${
            config.isLowPerformance ? "8px" : "15px"
          }, 0) scale(1) rotate(${
      config.isLowPerformance ? "90deg" : "180deg"
    }); 
        }
        75% { 
          transform: translate(0, ${
            config.isLowPerformance ? "8px" : "15px"
          }) scale(${config.isLowPerformance ? "1.02" : "1.05"}) rotate(${
      config.isLowPerformance ? "135deg" : "270deg"
    }); 
        }
      }

      @keyframes gradient-shift {
        0%, 100% { transform: rotate(0deg) scale(1); }
        50% { transform: rotate(180deg) scale(${
          config.isLowPerformance ? "1.1" : "1.2"
        }); }
      }

      @keyframes gradient-shift-reverse {
        0%, 100% { transform: rotate(360deg) scale(${
          config.isLowPerformance ? "1.05" : "1.1"
        }); }
        50% { transform: rotate(180deg) scale(1); }
      }

      .bg-float-element {
        animation: float-gentle var(--duration) ease-in-out infinite;
        animation-delay: var(--delay);
      }

      .bg-gradient-orb-1 {
        animation: gradient-shift ${
          config.isLowPerformance ? "20s" : "25s"
        } linear infinite;
      }

      .bg-gradient-orb-2 {
        animation: gradient-shift-reverse ${
          config.isLowPerformance ? "25s" : "30s"
        } linear infinite;
      }
    `;
    document.head.appendChild(style);

    return () => {
      const existingStyle = document.getElementById(styleId);
      if (existingStyle) {
        existingStyle.remove();
      }
    };
  }, [config.isLowPerformance]);

  return (
    <div
      ref={mouseTrackerRef}
      className="fixed inset-0 overflow-hidden pointer-events-none z-0"
    >
      {/* Gradient Mesh Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50/20 via-orange-50/10 to-red-50/20 dark:from-blue-950/20 dark:via-orange-950/10 dark:to-red-950/20" />

      {/* Interactive Mouse Glow - Only on high performance devices */}
      {config.canUseComplexAnimations && (
        <div
          className="absolute w-64 h-64 rounded-full opacity-30 transition-all duration-700 ease-out"
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
          className="absolute rounded-full bg-gradient-to-r from-blue-400/15 to-orange-400/15 backdrop-blur-sm bg-float-element"
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
          backgroundSize: config.isLowPerformance ? "60px 60px" : "40px 40px",
        }}
      />

      {/* Optimized Animated Gradient Orbs */}
      <div
        className="absolute top-1/4 left-1/4 w-48 h-48 rounded-full opacity-15 bg-gradient-orb-1"
        style={{
          background: "linear-gradient(45deg, #3b82f6, #8b5cf6, #06b6d4)",
          filter: config.isLowPerformance ? "blur(40px)" : "blur(60px)",
        }}
      />

      <div
        className="absolute bottom-1/4 right-1/4 w-32 h-32 rounded-full opacity-10 bg-gradient-orb-2"
        style={{
          background: "linear-gradient(-45deg, #f59e0b, #ef4444, #ec4899)",
          filter: config.isLowPerformance ? "blur(30px)" : "blur(50px)",
        }}
      />
    </div>
  );
};

export default Background;

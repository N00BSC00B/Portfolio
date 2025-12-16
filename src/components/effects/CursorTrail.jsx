"use client";
"use client";

/**
 * Lightweight CursorTrail - High performance alternative to Framer Motion version
 * Uses direct DOM manipulation for reliable visibility
 */

import { useEffect, useRef } from "react";

export const CursorTrail = () => {
  const trailRef = useRef([]);
  const mousePos = useRef({ x: 0, y: 0 });
  const animationRef = useRef();

  useEffect(() => {
    // Simple desktop detection
    const isDesktop = () => {
      const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;
      if (prefersReducedMotion) return false;

      const hasFinePointer = window.matchMedia("(pointer: fine)").matches;
      const isLargeScreen = window.innerWidth >= 1024;
      const hasHover = window.matchMedia("(hover: hover)").matches;

      return hasFinePointer && isLargeScreen && hasHover;
    };

    if (!isDesktop()) {
      return;
    }

    // Create trail dots
    const trailLength = 8;
    const dots = [];

    for (let i = 0; i < trailLength; i++) {
      const dot = document.createElement("div");
      dot.className = `cursor-trail-dot-${i}`;

      // Calculate size and opacity based on position in trail - BIGGER SIZES!
      const size = Math.max(6, 16 - i * 1.5); // Starts at 16px, goes down to 6px
      const opacity = Math.max(0.1, 0.8 - i * 0.1);

      dot.style.position = "fixed";
      dot.style.width = `${size}px`;
      dot.style.height = `${size}px`;
      dot.style.backgroundColor = `rgba(249, 115, 22, ${opacity})`;
      dot.style.borderRadius = "50%";
      dot.style.pointerEvents = "none";
      dot.style.zIndex = "999999";
      dot.style.left = "0px";
      dot.style.top = "0px";
      dot.style.transform = "translate3d(-100px, -100px, 0)";
      dot.style.transition = "none";
      dot.style.boxShadow = `0 0 ${size * 2.5}px rgba(249, 115, 22, ${
        opacity * 0.6
      })`;
      dot.style.mixBlendMode = "normal";
      dot.style.willChange = "transform"; // Optimize for animations

      document.body.appendChild(dot);
      dots.push({
        element: dot,
        x: -100,
        y: -100,
        targetX: -100,
        targetY: -100,
        size: size,
      });
    }

    trailRef.current = dots;

    // Mouse move handler with hover detection (throttled)
    let mouseMoveTimeout;
    const handleMouseMove = (e) => {
      mousePos.current.x = e.clientX;
      mousePos.current.y = e.clientY;

      // Throttle hover detection to reduce performance impact
      if (mouseMoveTimeout) return;
      mouseMoveTimeout = setTimeout(() => {
        mouseMoveTimeout = null;

        // Check if hovering over interactive elements
        const target = e.target;
        const isInteractive =
          target.tagName === "BUTTON" ||
          target.tagName === "A" ||
          target.closest("button") ||
          target.closest("a") ||
          target.closest('[role="button"]') ||
          target.closest("[onclick]");

        // Adjust trail behavior for interactive elements
        trailRef.current.forEach((dot, index) => {
          if (isInteractive) {
            // Make trail more prominent on hover - BIGGER SCALE!
            dot.element.style.transform += ` scale(${1.5 + index * 0.15})`;
            dot.element.style.backgroundColor = `rgba(255, 69, 0, ${Math.max(
              0.1,
              0.9 - index * 0.1
            )})`;
          } else {
            // Normal trail - remove any existing scale
            const currentTransform = dot.element.style.transform.replace(
              / scale\([^)]*\)/g,
              ""
            );
            dot.element.style.transform = currentTransform;
            dot.element.style.backgroundColor = `rgba(249, 115, 22, ${Math.max(
              0.1,
              0.8 - index * 0.1
            )})`;
          }
        });
      }, 16); // ~60fps throttling
    };

    // Animation loop with performance optimization
    let lastTime = 0;
    const targetFPS = 60;
    const frameTime = 1000 / targetFPS;

    const animate = (currentTime) => {
      // Throttle to 60fps max
      if (currentTime - lastTime < frameTime) {
        animationRef.current = requestAnimationFrame(animate);
        return;
      }
      lastTime = currentTime;

      if (trailRef.current.length > 0) {
        // Update first dot to mouse position
        trailRef.current[0].targetX = mousePos.current.x;
        trailRef.current[0].targetY = mousePos.current.y;

        // Batch DOM updates for better performance
        const updates = [];

        // Update trail with smooth interpolation
        trailRef.current.forEach((dot, index) => {
          if (index === 0) {
            // First dot follows mouse directly but smoothly
            dot.x += (dot.targetX - dot.x) * 0.8;
            dot.y += (dot.targetY - dot.y) * 0.8;
          } else {
            // Other dots follow the previous dot with decreasing responsiveness
            const prev = trailRef.current[index - 1];
            const speed = 0.15 + index * 0.02; // Progressively slower
            dot.x += (prev.x - dot.x) * speed;
            dot.y += (prev.y - dot.y) * speed;
          }

          // Prepare DOM update
          const centerOffset = dot.size / 2;
          updates.push({
            element: dot.element,
            x: dot.x - centerOffset,
            y: dot.y - centerOffset,
          });
        });

        // Apply all DOM updates at once
        updates.forEach((update) => {
          update.element.style.transform = `translate3d(${update.x}px, ${update.y}px, 0)`;
        });
      }

      animationRef.current = requestAnimationFrame(animate);
    };

    // Start everything
    document.addEventListener("mousemove", handleMouseMove, { passive: true });
    animate();

    // Cleanup function
    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }

      // Remove dots from DOM
      trailRef.current.forEach((dot) => {
        if (dot.element && dot.element.parentNode) {
          dot.element.parentNode.removeChild(dot.element);
        }
      });
      trailRef.current = [];
    };
  }, []);

  return null;
};

export default CursorTrail;

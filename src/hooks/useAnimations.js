/**
 * Lightweight animation hooks - Performance-optimized alternatives to Framer Motion
 * Uses native Web APIs for better performance on older devices
 */

import { useEffect, useRef, useState, useCallback } from "react";
import {
  getDeviceCapabilities,
  getAnimationPresets,
  createScrollReveal,
  addHoverAnimation,
  createTypewriterEffect,
  intersectionObserver,
  batchDOMUpdates,
} from "../utils/lightAnimations";

// Hook for scroll-triggered animations
export const useScrollReveal = (options = {}) => {
  const elementRef = useRef(null);
  const cleanupRef = useRef(null);

  useEffect(() => {
    if (elementRef.current) {
      cleanupRef.current = createScrollReveal(elementRef.current, options);
    }

    return () => {
      if (cleanupRef.current) {
        cleanupRef.current();
      }
    };
  }, [
    options.direction,
    options.distance,
    options.duration,
    options.delay,
    options.easing,
    options.threshold,
    options.once,
  ]);

  return elementRef;
};

// Hook for hover animations with performance optimization
export const useHoverAnimation = (options = {}) => {
  const elementRef = useRef(null);
  const cleanupRef = useRef(null);
  const { isLowPerformance } = getDeviceCapabilities();

  useEffect(() => {
    if (elementRef.current && !isLowPerformance) {
      cleanupRef.current = addHoverAnimation(elementRef.current, options);
    }

    return () => {
      if (cleanupRef.current) {
        cleanupRef.current();
      }
    };
  }, [
    isLowPerformance,
    options.scale,
    options.translateY,
    options.duration,
    options.easing,
  ]);

  return elementRef;
};

// Hook for typewriter effect
export const useTypewriter = (texts, options = {}) => {
  const elementRef = useRef(null);
  const cleanupRef = useRef(null);

  useEffect(() => {
    if (elementRef.current && texts.length > 0) {
      cleanupRef.current = createTypewriterEffect(
        elementRef.current,
        texts,
        options
      );
    }

    return () => {
      if (cleanupRef.current) {
        cleanupRef.current();
      }
    };
  }, [
    texts,
    options.typeSpeed,
    options.deleteSpeed,
    options.pauseDuration,
    options.loop,
  ]);

  return elementRef;
};

// Hook for intersection observer with performance optimization
export const useIntersectionObserver = (callback, options = {}) => {
  const elementRef = useRef(null);
  const callbackRef = useRef(callback);

  // Update callback ref when callback changes
  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  useEffect(() => {
    let cleanup;
    if (elementRef.current) {
      cleanup = intersectionObserver.observe(
        elementRef.current,
        (entry) => callbackRef.current(entry),
        options
      );
    }

    return cleanup;
  }, [options.threshold, options.rootMargin]);

  return elementRef;
};

// Hook for staggered list animations
export const useStaggeredAnimation = (itemCount, options = {}) => {
  const containerRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const presets = getAnimationPresets();
  const staggerDelay = options.staggerDelay || 100;

  const itemsRef = useRef([]);
  itemsRef.current = [];

  const addItemRef = useCallback((element) => {
    if (element && !itemsRef.current.includes(element)) {
      itemsRef.current.push(element);
    }
  }, []);

  useEffect(() => {
    let cleanup;
    if (containerRef.current) {
      cleanup = intersectionObserver.observe(
        containerRef.current,
        (entry) => {
          if (entry.isIntersecting && !isVisible) {
            setIsVisible(true);

            // Animate items with stagger
            itemsRef.current.forEach((element, index) => {
              if (element) {
                setTimeout(() => {
                  element.style.opacity = "1";
                  element.style.transform = "translateY(0) scale(1)";
                }, index * staggerDelay);
              }
            });
          }
        },
        { threshold: 0.1 }
      );
    }

    return cleanup;
  }, [isVisible, itemCount, staggerDelay]);

  // Initialize items with hidden state
  useEffect(() => {
    itemsRef.current.forEach((element) => {
      if (element && !isVisible) {
        element.style.opacity = "0";
        element.style.transform = "translateY(20px) scale(0.95)";
        element.style.transition = `opacity ${presets.duration.medium}ms ${presets.easing.easeOut}, transform ${presets.duration.medium}ms ${presets.easing.easeOut}`;
      }
    });
  }, [isVisible, presets]);

  return { containerRef, addItemRef, isVisible };
};

// Hook for optimized mouse tracking
export const useMouseTracker = (onMouseMove, throttleMs = 16) => {
  const elementRef = useRef(null);
  const lastUpdate = useRef(0);
  const rafId = useRef(null);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const handleMouseMove = (e) => {
      const now = Date.now();
      if (now - lastUpdate.current < throttleMs) return;

      lastUpdate.current = now;

      if (rafId.current) {
        cancelAnimationFrame(rafId.current);
      }

      rafId.current = requestAnimationFrame(() => {
        onMouseMove(e);
      });
    };

    element.addEventListener("mousemove", handleMouseMove, { passive: true });

    return () => {
      element.removeEventListener("mousemove", handleMouseMove);
      if (rafId.current) {
        cancelAnimationFrame(rafId.current);
      }
    };
  }, [onMouseMove, throttleMs]);

  return elementRef;
};

// Hook for optimized scroll-based animations
export const useScrollAnimation = (onScroll, throttleMs = 16) => {
  const [scrollY, setScrollY] = useState(0);
  const lastUpdate = useRef(0);
  const rafId = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      const now = Date.now();
      if (now - lastUpdate.current < throttleMs) return;

      lastUpdate.current = now;

      if (rafId.current) {
        cancelAnimationFrame(rafId.current);
      }

      rafId.current = requestAnimationFrame(() => {
        const newScrollY = window.scrollY;
        setScrollY(newScrollY);
        if (onScroll) {
          onScroll(newScrollY);
        }
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (rafId.current) {
        cancelAnimationFrame(rafId.current);
      }
    };
  }, [onScroll, throttleMs]);

  return scrollY;
};

// Hook for progressive loading with fade-in
export const useProgressiveLoader = (src, placeholder) => {
  const [loadedSrc, setLoadedSrc] = useState(placeholder);
  const [isLoaded, setIsLoaded] = useState(false);
  const imgRef = useRef(null);

  useEffect(() => {
    if (src) {
      const img = new Image();
      img.onload = () => {
        batchDOMUpdates([() => setLoadedSrc(src), () => setIsLoaded(true)]);
      };
      img.src = src;
    }
  }, [src]);

  useEffect(() => {
    if (imgRef.current && isLoaded) {
      imgRef.current.style.opacity = "0";
      imgRef.current.style.transition = "opacity 300ms ease-in-out";

      requestAnimationFrame(() => {
        if (imgRef.current) {
          imgRef.current.style.opacity = "1";
        }
      });
    }
  }, [isLoaded]);

  return { imgRef, loadedSrc, isLoaded };
};

// Hook for device-specific animation configurations
export const useAnimationConfig = () => {
  const [config, setConfig] = useState(() => ({
    ...getDeviceCapabilities(),
    ...getAnimationPresets(),
  }));

  useEffect(() => {
    const updateConfig = () => {
      setConfig({
        ...getDeviceCapabilities(),
        ...getAnimationPresets(),
      });
    };

    // Update on window resize or connection change
    window.addEventListener("resize", updateConfig);

    if ("connection" in navigator) {
      navigator.connection.addEventListener("change", updateConfig);
    }

    return () => {
      window.removeEventListener("resize", updateConfig);
      if ("connection" in navigator) {
        navigator.connection.removeEventListener("change", updateConfig);
      }
    };
  }, []);

  return config;
};

// Hook for optimized component mounting animation
export const useMountAnimation = (options = {}) => {
  const elementRef = useRef(null);
  const [isMounted, setIsMounted] = useState(false);
  const presets = getAnimationPresets();

  const {
    duration = presets.duration.medium,
    easing = presets.easing.easeOut,
    delay = 0,
    from = { opacity: 0, transform: "translateY(20px) scale(0.95)" },
    to = { opacity: 1, transform: "translateY(0) scale(1)" },
  } = options;

  useEffect(() => {
    if (elementRef.current) {
      // Set initial state
      Object.assign(elementRef.current.style, {
        ...from,
        transition: `opacity ${duration}ms ${easing} ${delay}ms, transform ${duration}ms ${easing} ${delay}ms`,
      });

      // Trigger animation
      const timeoutId = setTimeout(() => {
        if (elementRef.current) {
          Object.assign(elementRef.current.style, to);
          setIsMounted(true);
        }
      }, 50); // Small delay to ensure initial state is applied

      return () => clearTimeout(timeoutId);
    }
  }, [duration, easing, delay, JSON.stringify(from), JSON.stringify(to)]);

  return { elementRef, isMounted };
};

export default {
  useScrollReveal,
  useHoverAnimation,
  useTypewriter,
  useIntersectionObserver,
  useStaggeredAnimation,
  useMouseTracker,
  useScrollAnimation,
  useProgressiveLoader,
  useAnimationConfig,
  useMountAnimation,
};

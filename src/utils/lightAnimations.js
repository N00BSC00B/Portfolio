/**
 * Lightweight animation utilities - High performance alternative to Framer Motion
 * Uses CSS animations, Web Animations API, and optimized JavaScript for smooth performance
 */

// Performance detection utilities
export const getDeviceCapabilities = () => {
  const isMobile =
    /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent
    );
  const isLowMemory = navigator.deviceMemory && navigator.deviceMemory <= 2;
  const isLowConcurrency =
    navigator.hardwareConcurrency && navigator.hardwareConcurrency <= 2;
  const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;
  const isSlowConnection =
    navigator.connection &&
    navigator.connection.effectiveType &&
    (navigator.connection.effectiveType === "slow-2g" ||
      navigator.connection.effectiveType === "2g");

  return {
    isMobile,
    isLowPerformance:
      isMobile || isLowMemory || isLowConcurrency || isSlowConnection,
    prefersReducedMotion,
    canUseComplexAnimations:
      !isMobile && !isLowMemory && !isLowConcurrency && !prefersReducedMotion,
  };
};

// Animation configurations based on device capability
export const getAnimationPresets = () => {
  const { isLowPerformance, prefersReducedMotion, canUseComplexAnimations } =
    getDeviceCapabilities();

  return {
    duration: {
      fast: prefersReducedMotion ? 0 : isLowPerformance ? 150 : 200,
      medium: prefersReducedMotion ? 0 : isLowPerformance ? 250 : 400,
      slow: prefersReducedMotion ? 0 : isLowPerformance ? 350 : 600,
    },
    easing: {
      easeOut: isLowPerformance
        ? "linear"
        : "cubic-bezier(0.25, 0.46, 0.45, 0.94)",
      easeInOut: isLowPerformance ? "linear" : "cubic-bezier(0.42, 0, 0.58, 1)",
      bounce: canUseComplexAnimations
        ? "cubic-bezier(0.68, -0.55, 0.265, 1.55)"
        : "ease-out",
    },
    enableComplexAnimations: canUseComplexAnimations,
    enableParticles: canUseComplexAnimations,
    particleCount: isLowPerformance ? 3 : canUseComplexAnimations ? 15 : 8,
  };
};

// Intersection Observer with performance optimizations
class OptimizedIntersectionObserver {
  constructor() {
    this.observers = new Map();
    this.rafId = null;
    this.pendingUpdates = new Set();
  }

  observe(element, callback, options = {}) {
    const defaultOptions = {
      threshold: 0.1,
      rootMargin: "50px 0px",
      ...options,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        this.pendingUpdates.add(() => callback(entry));
      });

      if (!this.rafId) {
        this.rafId = requestAnimationFrame(() => {
          this.pendingUpdates.forEach((update) => update());
          this.pendingUpdates.clear();
          this.rafId = null;
        });
      }
    }, defaultOptions);

    observer.observe(element);
    this.observers.set(element, observer);

    return () => this.unobserve(element);
  }

  unobserve(element) {
    const observer = this.observers.get(element);
    if (observer) {
      observer.unobserve(element);
      observer.disconnect();
      this.observers.delete(element);
    }
  }
}

export const intersectionObserver = new OptimizedIntersectionObserver();

// CSS Animation Class Generator
export const createAnimationClass = (name, keyframes, options = {}) => {
  const { duration, easing, fillMode = "both", delay = 0 } = options;

  if (typeof document !== "undefined") {
    const style = document.createElement("style");
    style.textContent = `
      @keyframes ${name} {
        ${keyframes}
      }
      .anim-${name} {
        animation: ${name} ${duration}ms ${
      easing || "ease-out"
    } ${delay}ms ${fillMode};
      }
    `;
    document.head.appendChild(style);
  }
};

// Optimized scroll-triggered animations
export const createScrollReveal = (element, options = {}) => {
  const presets = getAnimationPresets();
  const {
    direction = "up",
    distance = 30,
    duration = presets.duration.medium,
    delay = 0,
    easing = presets.easing.easeOut,
    threshold = 0.1,
    once = true,
  } = options;

  if (presets.enableComplexAnimations === false && distance > 15) {
    options.distance = 15;
  }

  const initialTransform =
    {
      up: `translateY(${distance}px)`,
      down: `translateY(-${distance}px)`,
      left: `translateX(${distance}px)`,
      right: `translateX(-${distance}px)`,
      scale: "scale(0.95)",
      fade: "translateY(10px)",
    }[direction] || `translateY(${distance}px)`;

  // Set initial state
  element.style.opacity = "0";
  element.style.transform = initialTransform;
  element.style.transition = `opacity ${duration}ms ${easing} ${delay}ms, transform ${duration}ms ${easing} ${delay}ms`;

  let hasAnimated = false;

  const cleanup = intersectionObserver.observe(
    element,
    (entry) => {
      if (entry.isIntersecting && (!once || !hasAnimated)) {
        element.style.opacity = "1";
        element.style.transform = "none";
        hasAnimated = true;

        if (once) {
          setTimeout(cleanup, duration + delay + 100);
        }
      } else if (!entry.isIntersecting && !once) {
        element.style.opacity = "0";
        element.style.transform = initialTransform;
      }
    },
    { threshold }
  );

  return cleanup;
};

// Lightweight hover animations
export const addHoverAnimation = (element, options = {}) => {
  const presets = getAnimationPresets();
  const {
    scale = 1.05,
    translateY = -2,
    duration = presets.duration.fast,
    easing = presets.easing.easeOut,
  } = options;

  if (!presets.enableComplexAnimations) {
    return; // Skip hover animations on low-performance devices
  }

  element.style.transition = `transform ${duration}ms ${easing}`;

  const handleMouseEnter = () => {
    element.style.transform = `scale(${scale}) translateY(${translateY}px)`;
  };

  const handleMouseLeave = () => {
    element.style.transform = "none";
  };

  element.addEventListener("mouseenter", handleMouseEnter, { passive: true });
  element.addEventListener("mouseleave", handleMouseLeave, { passive: true });

  return () => {
    element.removeEventListener("mouseenter", handleMouseEnter);
    element.removeEventListener("mouseleave", handleMouseLeave);
  };
};

// Optimized typewriter effect
export const createTypewriterEffect = (element, texts, options = {}) => {
  const presets = getAnimationPresets();
  const {
    typeSpeed = presets.isLowPerformance ? 100 : 50,
    deleteSpeed = presets.isLowPerformance ? 50 : 30,
    pauseDuration = presets.isLowPerformance ? 1500 : 2000,
    loop = true,
  } = options;

  let currentTextIndex = 0;
  let currentCharIndex = 0;
  let isDeleting = false;
  let timeoutId;

  const type = () => {
    const currentText = texts[currentTextIndex];

    if (isDeleting) {
      element.textContent = currentText.substring(0, currentCharIndex - 1);
      currentCharIndex--;

      if (currentCharIndex === 0) {
        isDeleting = false;
        currentTextIndex = (currentTextIndex + 1) % texts.length;
        timeoutId = setTimeout(type, typeSpeed);
      } else {
        timeoutId = setTimeout(type, deleteSpeed);
      }
    } else {
      element.textContent = currentText.substring(0, currentCharIndex + 1);
      currentCharIndex++;

      if (currentCharIndex === currentText.length) {
        if (loop) {
          isDeleting = true;
          timeoutId = setTimeout(type, pauseDuration);
        }
      } else {
        timeoutId = setTimeout(type, typeSpeed);
      }
    }
  };

  type();

  return () => clearTimeout(timeoutId);
};

// Optimized stagger animations
export const createStaggerAnimation = (elements, options = {}) => {
  const presets = getAnimationPresets();
  const {
    delay = 100,
    duration = presets.duration.medium,
    direction = "up",
    distance = 20,
  } = options;

  elements.forEach((element, index) => {
    setTimeout(() => {
      createScrollReveal(element, {
        direction,
        distance,
        duration,
        delay: 0, // Individual delay already applied
      });
    }, index * delay);
  });
};

// Optimized loading animation
export const createLoadingAnimation = (element, options = {}) => {
  const presets = getAnimationPresets();
  const { type = "spin", duration = presets.duration.slow } = options;

  const animations = {
    spin: `
      @keyframes spin {
        from { transform: rotate(0deg); }
        to { transform: rotate(360deg); }
      }
    `,
    pulse: `
      @keyframes pulse {
        0%, 100% { opacity: 1; transform: scale(1); }
        50% { opacity: 0.7; transform: scale(1.05); }
      }
    `,
    bounce: presets.enableComplexAnimations
      ? `
      @keyframes bounce {
        0%, 20%, 53%, 80%, 100% { transform: translateY(0); }
        40%, 43% { transform: translateY(-10px); }
        70% { transform: translateY(-5px); }
        90% { transform: translateY(-2px); }
      }
    `
      : `
      @keyframes bounce {
        0%, 100% { transform: translateY(0); }
        50% { transform: translateY(-5px); }
      }
    `,
  };

  // Inject animation CSS
  if (!document.querySelector(`#loading-${type}`)) {
    const style = document.createElement("style");
    style.id = `loading-${type}`;
    style.textContent = animations[type];
    document.head.appendChild(style);
  }

  element.style.animation = `${type} ${duration}ms linear infinite`;

  return () => {
    element.style.animation = "";
  };
};

// Utility to batch DOM operations
export const batchDOMUpdates = (updates) => {
  return new Promise((resolve) => {
    requestAnimationFrame(() => {
      updates.forEach((update) => update());
      resolve();
    });
  });
};

// Debounced resize handler for responsive animations
export const createResponsiveHandler = (callback, delay = 250) => {
  let timeoutId;
  let isThrottled = false;

  return () => {
    if (!isThrottled) {
      callback();
      isThrottled = true;
      setTimeout(() => (isThrottled = false), 100);
    }

    clearTimeout(timeoutId);
    timeoutId = setTimeout(callback, delay);
  };
};

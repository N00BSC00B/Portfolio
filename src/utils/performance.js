// Performance optimization utilities
export const debounce = (func, wait) => {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};

export const throttle = (func, limit) => {
  let inThrottle;
  return (...args) => {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
};

// Check if device prefers reduced motion
export const prefersReducedMotion = () => {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
};

// Detect mobile device
export const isMobileDevice = () => {
  return (
    /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent
    ) || window.innerWidth <= 768
  );
};

// Check if device has low performance capability
export const isLowPerformanceDevice = () => {
  return (
    navigator.hardwareConcurrency <= 2 ||
    navigator.deviceMemory <= 2 ||
    isMobileDevice()
  );
};

// Animation configuration based on device capability
export const getAnimationConfig = () => {
  const isLowPerf = isLowPerformanceDevice();
  const reducedMotion = prefersReducedMotion();

  return {
    duration: reducedMotion ? 0 : isLowPerf ? 0.2 : 0.3,
    ease: isLowPerf ? "linear" : "easeOut",
    damping: isLowPerf ? 10 : 28,
    stiffness: isLowPerf ? 100 : 500,
    enableHoverAnimations: !isLowPerf && !reducedMotion,
    enableComplexAnimations: !isLowPerf && !reducedMotion,
    particleCount: isLowPerf ? 3 : 15,
  };
};

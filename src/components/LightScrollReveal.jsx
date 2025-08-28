/**
 * Lightweight ScrollReveal component - High performance alternative to Framer Motion
 * Uses Intersection Observer API and CSS transitions for smooth animations
 */

import PropTypes from "prop-types";
import { useScrollReveal, useAnimationConfig } from "../hooks/useAnimations";

export const LightScrollReveal = ({
  children,
  direction = "up",
  distance = 30,
  delay = 0,
  duration,
  className = "",
  threshold = 0.1,
  once = true,
  ...props
}) => {
  const config = useAnimationConfig();

  const finalDuration = duration || config.duration.medium;
  const finalDistance = config.isLowPerformance
    ? Math.min(distance, 15)
    : distance;

  const elementRef = useScrollReveal({
    direction,
    distance: finalDistance,
    duration: finalDuration,
    delay,
    threshold,
    once,
    easing: config.easing.easeOut,
  });

  return (
    <div ref={elementRef} className={className} {...props}>
      {children}
    </div>
  );
};

LightScrollReveal.propTypes = {
  children: PropTypes.node.isRequired,
  direction: PropTypes.oneOf(["up", "down", "left", "right", "scale", "fade"]),
  distance: PropTypes.number,
  delay: PropTypes.number,
  duration: PropTypes.number,
  className: PropTypes.string,
  threshold: PropTypes.number,
  once: PropTypes.bool,
};

export default LightScrollReveal;

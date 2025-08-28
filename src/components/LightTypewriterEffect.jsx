/**
 * Lightweight TypewriterEffect component - Performance optimized alternative
 * Uses native JavaScript for better performance on older devices
 */

import { useTypewriter, useAnimationConfig } from "../hooks/useAnimations";
import PropTypes from "prop-types";

export const LightTypewriterEffect = ({
  words,
  className = "",
  typeSpeed,
  deleteSpeed,
  pauseDuration,
  loop = true,
}) => {
  const config = useAnimationConfig();

  const options = {
    typeSpeed: typeSpeed || (config.isLowPerformance ? 100 : 50),
    deleteSpeed: deleteSpeed || (config.isLowPerformance ? 50 : 30),
    pauseDuration: pauseDuration || (config.isLowPerformance ? 1500 : 2000),
    loop,
  };

  const elementRef = useTypewriter(words, options);

  return (
    <span
      ref={elementRef}
      className={`inline-block ${className}`}
      aria-label={words.join(", ")}
    />
  );
};

LightTypewriterEffect.propTypes = {
  words: PropTypes.arrayOf(PropTypes.string).isRequired,
  className: PropTypes.string,
  typeSpeed: PropTypes.number,
  deleteSpeed: PropTypes.number,
  pauseDuration: PropTypes.number,
  loop: PropTypes.bool,
};

export default LightTypewriterEffect;

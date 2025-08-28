import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { getDeviceCapabilities } from "../utils/lightAnimations";

export const TypewriterEffect = ({
  words,
  className = "",
  speed = 100,
  deleteSpeed = 50,
  delayBetweenWords = 2000,
}) => {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [currentText, setCurrentText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [showCursor, setShowCursor] = useState(true);

  // Get device capabilities for performance optimization
  const { isLowPerformance, prefersReducedMotion } = getDeviceCapabilities();

  // Adjust speeds based on device performance
  const optimizedSpeed = isLowPerformance ? Math.max(speed * 2, 150) : speed;
  const optimizedDeleteSpeed = isLowPerformance
    ? Math.max(deleteSpeed * 2, 100)
    : deleteSpeed;
  const optimizedDelay = isLowPerformance
    ? Math.min(delayBetweenWords * 0.7, 1500)
    : delayBetweenWords;

  useEffect(() => {
    // Skip animation if user prefers reduced motion
    if (prefersReducedMotion) {
      setCurrentText(words[0] || "");
      return;
    }

    const currentWord = words[currentWordIndex];

    const timeout = setTimeout(
      () => {
        if (!isDeleting) {
          // Typing
          if (currentText.length < currentWord.length) {
            setCurrentText(currentWord.slice(0, currentText.length + 1));
          } else {
            // Word complete, wait then start deleting
            setTimeout(() => setIsDeleting(true), optimizedDelay);
          }
        } else {
          // Deleting
          if (currentText.length > 0) {
            setCurrentText(currentText.slice(0, -1));
          } else {
            // Deletion complete, move to next word
            setIsDeleting(false);
            setCurrentWordIndex((prev) => (prev + 1) % words.length);
          }
        }
      },
      isDeleting ? optimizedDeleteSpeed : optimizedSpeed
    );

    return () => clearTimeout(timeout);
  }, [
    currentText,
    isDeleting,
    currentWordIndex,
    words,
    optimizedSpeed,
    optimizedDeleteSpeed,
    optimizedDelay,
    prefersReducedMotion,
  ]);

  // Cursor blinking effect with performance optimization
  useEffect(() => {
    if (prefersReducedMotion) {
      setShowCursor(true);
      return;
    }

    const cursorInterval = setInterval(
      () => {
        setShowCursor((prev) => !prev);
      },
      isLowPerformance ? 750 : 500
    ); // Slower blinking on low-performance devices

    return () => clearInterval(cursorInterval);
  }, [isLowPerformance, prefersReducedMotion]);

  return (
    <span className={className}>
      {currentText}
      <span
        className={`inline-block w-0.5 h-6 bg-current ml-1 ${
          showCursor ? "opacity-100" : "opacity-0"
        } ${prefersReducedMotion ? "" : "transition-opacity duration-100"}`}
      />
    </span>
  );
};

TypewriterEffect.propTypes = {
  words: PropTypes.arrayOf(PropTypes.string).isRequired,
  className: PropTypes.string,
  speed: PropTypes.number,
  deleteSpeed: PropTypes.number,
  delayBetweenWords: PropTypes.number,
};

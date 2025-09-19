import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import PropTypes from "prop-types";

export const ScrollingRoles = ({ roles, interval = 3000, className = "" }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % roles.length);
    }, interval);

    return () => clearInterval(timer);
  }, [roles.length, interval]);

  return (
    <div className={`relative overflow-hidden ${className}`}>
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{
            opacity: 0,
            y: 50,
            scale: 0.9,
          }}
          animate={{
            opacity: 1,
            y: 0,
            scale: 1,
          }}
          exit={{
            opacity: 0,
            y: -50,
            scale: 0.9,
          }}
          transition={{
            duration: 0.5,
            ease: "easeInOut",
          }}
          className="text-xl md:text-2xl font-semibold text-primary"
        >
          {roles[currentIndex]}
        </motion.div>
      </AnimatePresence>

      {/* Optional progress indicator */}
      <div className="flex justify-center mt-3 space-x-1">
        {roles.map((_, index) => (
          <motion.div
            key={index}
            className={`h-1 rounded-full transition-all duration-300 ${
              index === currentIndex ? "w-6 bg-primary" : "w-2 bg-primary/30"
            }`}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: index * 0.1 }}
          />
        ))}
      </div>
    </div>
  );
};

ScrollingRoles.propTypes = {
  roles: PropTypes.arrayOf(PropTypes.string).isRequired,
  interval: PropTypes.number,
  className: PropTypes.string,
};

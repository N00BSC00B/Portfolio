import { motion } from "framer-motion";
import { useState } from "react";
import PropTypes from "prop-types";

export const GlassmorphismCard = ({
  children,
  className = "",
  hoverEffect = true,
  blur = "backdrop-blur-lg",
  background = "bg-white/10 dark:bg-white/5",
}) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e) => {
    if (!hoverEffect) return;

    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setMousePosition({ x, y });
  };

  return (
    <motion.div
      className={`
        relative overflow-hidden rounded-2xl border border-white/20 dark:border-white/10
        ${background} ${blur} 
        shadow-lg shadow-black/10 dark:shadow-black/20
        ${className}
      `}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={
        hoverEffect
          ? {
              scale: 1.02,
              rotateX: 2,
              rotateY: 2,
            }
          : {}
      }
      transition={{ duration: 0.3, ease: "easeOut" }}
      style={{
        transformStyle: "preserve-3d",
      }}
    >
      {/* Gradient Overlay on Hover */}
      {hoverEffect && (
        <motion.div
          className="absolute inset-0 opacity-0 pointer-events-none"
          animate={{
            opacity: isHovered ? 0.1 : 0,
            background: `radial-gradient(circle at ${mousePosition.x}% ${mousePosition.y}%, rgba(59, 130, 246, 0.3) 0%, transparent 50%)`,
          }}
          transition={{ duration: 0.3 }}
        />
      )}

      {/* Shimmer Effect */}
      <div className="absolute inset-0 opacity-0 hover:opacity-100 transition-opacity duration-500">
        <div
          className="absolute inset-0 animate-gradient"
          style={{
            background:
              "linear-gradient(45deg, transparent 30%, rgba(255, 255, 255, 0.1) 50%, transparent 70%)",
            backgroundSize: "200% 200%",
          }}
        />
      </div>

      {/* Border Glow */}
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-cyan-500/20 opacity-0 hover:opacity-100 transition-opacity duration-300 blur-sm" />

      <div className="relative z-10">{children}</div>
    </motion.div>
  );
};

GlassmorphismCard.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  hoverEffect: PropTypes.bool,
  blur: PropTypes.string,
  background: PropTypes.string,
};

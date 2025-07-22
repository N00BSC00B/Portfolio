import { cn } from "../lib/utils";
import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ThemeToggle } from "./ThemeToggle";
import { motion, AnimatePresence } from "framer-motion";

const navItems = [
  { name: "Home", id: "hero" },
  { name: "About", id: "about" },
  { name: "Skills", id: "skills" },
  { name: "Experience", id: "experience" },
  { name: "Projects", id: "projects" },
  { name: "Contact", id: "contact" },
];

export const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (id) => {
    if (location.pathname === "/") {
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: "smooth" });
    } else {
      navigate(`/#${id}`);
    }
    setIsMenuOpen(false); // Close mobile menu on nav click
  };

  return (
    <motion.nav
      className="fixed w-full z-40 transition-all duration-500"
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      {/* Always present backdrop */}
      <div
        className={cn(
          "absolute inset-0 transition-all duration-500",
          isScrolled
            ? "bg-background/80 dark:bg-background/60 backdrop-blur-xl border-b border-white/10"
            : "bg-background/20 dark:bg-background/10 backdrop-blur-sm"
        )}
      />

      {/* Content container */}
      <div
        className={cn(
          "relative z-10 transition-all duration-500",
          isScrolled ? "py-3" : "py-5"
        )}
      >
        {/* Gradient Border */}
        {isScrolled && (
          <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
        )}

        <div className="container flex items-center justify-between">
          <motion.button
            className="text-xl font-bold text-primary flex items-center relative group"
            onClick={() => handleNavClick("hero")}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <div className="relative">
              <span className="bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
                Sayan Barma
              </span>
              {/* Glow effect on hover */}
              <div className="absolute inset-0 bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent opacity-0 group-hover:opacity-100 blur-sm transition-opacity duration-300" />
            </div>
          </motion.button>

          {/* Desktop nav and Theme Toggle */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item, key) => (
              <button
                key={key}
                onClick={() => handleNavClick(item.id)}
                className="text-foreground/80 hover:text-primary transition-colors duration-300"
              >
                {item.name}
              </button>
            ))}
            {/* Use the unified ThemeToggle for Desktop */}
            <ThemeToggle />
          </div>

          {/* Mobile nav toggle and Theme Toggle */}
          <div className="md:hidden flex items-center space-x-2">
            {/* Use the unified ThemeToggle for Mobile (always visible) */}
            <ThemeToggle />
            <button
              onClick={() => setIsMenuOpen((prev) => !prev)}
              className="p-2 text-foreground z-50"
              aria-label={isMenuOpen ? "Close Menu" : "Open Menu"}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {/* Mobile nav overlay */}
          <AnimatePresence>
            {isMenuOpen && (
              <motion.div
                className="fixed inset-0 bg-background/95 dark:bg-background/90 backdrop-blur-xl z-30 flex flex-col items-center justify-center md:hidden"
                initial={{ opacity: 0, y: "-100%" }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: "-100%" }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
              >
                {/* Background gradient */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-purple-600/5" />

                <div className="relative z-10 flex flex-col space-y-8 text-xl">
                  {navItems.map((item, key) => (
                    <motion.button
                      key={key}
                      onClick={() => handleNavClick(item.id)}
                      className="text-foreground hover:text-primary transition-all duration-300 py-3 px-6 rounded-lg hover:bg-primary/10"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: key * 0.1, duration: 0.3 }}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      {item.name}
                    </motion.button>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.nav>
  );
};

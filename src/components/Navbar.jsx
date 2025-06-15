import { cn } from "../lib/utils";
import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ThemeToggle } from "./ThemeToggle";

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
    <nav
      className={cn(
        "fixed w-full z-40 transition-all duration-300",
        isScrolled ? "py-3 bg-background/80 backdrop-blur-md shadow-xs" : "py-5"
      )}
    >
      <div className="container flex items-center justify-between">
        <button
          className="text-xl font-bold text-primary flex items-center"
          onClick={() => handleNavClick("hero")}
        >
          <span className="relative z-10">
            <span className="text-glow text-foreground"> N00BSC00B </span>{" "}
            Studio
          </span>
        </button>

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

        {/* mobile nav overlay */}
        <div
          className={cn(
            "fixed inset-0 bg-background/95 backdrop-blur-md z-40 flex flex-col items-center justify-center",
            "transition-all duration-300 md:hidden",
            isMenuOpen
              ? "opacity-100 pointer-events-auto"
              : "opacity-0 pointer-events-none"
          )}
        >
          <div className="flex flex-col space-y-8 text-xl">
            {navItems.map((item, key) => (
              <button
                key={key}
                onClick={() => handleNavClick(item.id)}
                className="text-foreground/80 hover:text-primary transition-colors duration-300"
              >
                {item.name}
              </button>
            ))}
            {/* NO Theme Toggle here - it's already next to the hamburger icon */}
          </div>
        </div>
      </div>
    </nav>
  );
};

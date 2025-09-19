import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";
import { cn } from "../../lib/utils"; // Assuming you have this utility for conditional classes
import PropTypes from "prop-types";

export const ThemeToggle = ({ className }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const storedTheme = localStorage.getItem("theme");
    const htmlElement = document.documentElement;

    if (storedTheme === "light") {
      setIsDarkMode(false);
      htmlElement.setAttribute("data-theme", "light");
    } else if (storedTheme === "dark") {
      setIsDarkMode(true);
      htmlElement.setAttribute("data-theme", "dark");
    } else {
      // If no theme is stored, check system preference
      if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
        setIsDarkMode(true);
        htmlElement.setAttribute("data-theme", "dark");
        localStorage.setItem("theme", "dark");
      } else {
        setIsDarkMode(false);
        htmlElement.setAttribute("data-theme", "light");
        localStorage.setItem("theme", "light");
      }
    }
  }, []);

  const toggleTheme = () => {
    const htmlElement = document.documentElement;

    if (isDarkMode) {
      htmlElement.setAttribute("data-theme", "light");
      localStorage.setItem("theme", "light");
      setIsDarkMode(false);
    } else {
      htmlElement.setAttribute("data-theme", "dark");
      localStorage.setItem("theme", "dark");
      setIsDarkMode(true);
    }
  };

  return (
    <button
      onClick={toggleTheme}
      className={cn(
        "p-2 rounded-full transition-colors duration-300",
        "focus:outline-none hover:bg-black/10 dark:hover:bg-white/10",
        className
      )}
      aria-label={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
    >
      {isDarkMode ? (
        <Sun className="h-6 w-6 text-amber-400" />
      ) : (
        <Moon className="h-6 w-6 text-slate-600" />
      )}
    </button>
  );
};

ThemeToggle.propTypes = {
  className: PropTypes.string, // Optional className prop for additional styles
};

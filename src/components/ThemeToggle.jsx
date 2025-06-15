import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";
import { cn } from "../lib/utils"; // Assuming you have this utility for conditional classes
import PropTypes from "prop-types";

export const ThemeToggle = ({ className }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const storedTheme = localStorage.getItem("theme");

    if (storedTheme === "light") {
      setIsDarkMode(false);
      document.documentElement.classList.remove("dark");
    } else if (storedTheme === "dark") {
      setIsDarkMode(true);
      document.documentElement.classList.add("dark");
    } else {
      // If no theme is stored, check system preference
      if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
        setIsDarkMode(true);
        document.documentElement.classList.add("dark");
        localStorage.setItem("theme", "dark"); // Save system preference as default
      } else {
        setIsDarkMode(false);
        document.documentElement.classList.remove("dark");
        localStorage.setItem("theme", "light"); // Save light as default if system prefers light
      }
    }
  }, []);

  const toggleTheme = () => {
    if (isDarkMode) {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
      setIsDarkMode(false);
    } else {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
      setIsDarkMode(true);
    }
  };

  return (
    <button
      onClick={toggleTheme}
      // The className prop allows parent components (like Navbar) to add styles
      className={cn(
        "p-2 rounded-full transition-colors duration-300",
        "focus:outline-none", // Common class to remove default focus outline
        className // Applies additional classes passed from parent
      )}
      aria-label={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
    >
      {isDarkMode ? (
        <Sun className="h-6 w-6 text-yellow-300" /> // Yellow for Sun in dark mode
      ) : (
        <Moon className="h-6 w-6 text-blue-900" /> // Dark blue for Moon in light mode
      )}
    </button>
  );
};

ThemeToggle.propTypes = {
  className: PropTypes.string, // Optional className prop for additional styles
};

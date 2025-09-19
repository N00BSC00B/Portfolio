// Theme manager for dynamic manifest colors and theme switching
export class ThemeManager {
  constructor() {
    this.lightColors = {
      background: "#F8F9FA", // Light mode background - Very light grey/off-white
      surface: "#E9ECEF", // Light mode card color - Subtle light grey
      accent: "#FF6B6B", // Warm coral/orange-red accent
    };

    this.darkColors = {
      background: "#282C34", // Dark mode background - Deep charcoal grey
      surface: "#3B3F46", // Dark mode card color - Slightly lighter charcoal
      accent: "#FF6B6B", // Same warm coral/orange-red accent
    };
  }

  // Detect current theme
  getCurrentTheme() {
    if (typeof window === "undefined") return "dark";

    // Check if dark mode is explicitly set
    const isDarkMode =
      document.documentElement.classList.contains("dark") ||
      window.matchMedia("(prefers-color-scheme: dark)").matches;

    return isDarkMode ? "dark" : "light";
  }

  // Get colors for current theme
  getCurrentColors() {
    const theme = this.getCurrentTheme();
    return theme === "dark" ? this.darkColors : this.lightColors;
  }

  // Update manifest theme colors dynamically
  updateManifestColors() {
    const colors = this.getCurrentColors();

    // Update theme-color meta tag
    let themeColorMeta = document.querySelector('meta[name="theme-color"]');
    if (themeColorMeta) {
      themeColorMeta.setAttribute("content", colors.background);
    }

    // Update other theme-related meta tags
    let msNavButtonColorMeta = document.querySelector(
      'meta[name="msapplication-navbutton-color"]'
    );
    if (msNavButtonColorMeta) {
      msNavButtonColorMeta.setAttribute("content", colors.background);
    }

    let appleStatusBarMeta = document.querySelector(
      'meta[name="apple-mobile-web-app-status-bar-style"]'
    );
    if (appleStatusBarMeta) {
      appleStatusBarMeta.setAttribute(
        "content",
        this.getCurrentTheme() === "dark" ? "black-translucent" : "default"
      );
    }
  }

  // Initialize theme management
  init() {
    // Update colors on load
    this.updateManifestColors();

    // Listen for theme changes
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    mediaQuery.addEventListener("change", () => {
      this.updateManifestColors();
    });

    // Watch for manual theme changes (if you have a theme toggle)
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (
          mutation.type === "attributes" &&
          mutation.attributeName === "class"
        ) {
          this.updateManifestColors();
        }
      });
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });
  }
}

// Create and export singleton instance
export const themeManager = new ThemeManager();

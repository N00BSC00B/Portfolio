"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import { ChevronUp, Mail } from "lucide-react";

export const FloatingActionMenu = () => {
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [isFooterVisible, setIsFooterVisible] = useState(false);
  const ticking = useRef(false);

  useEffect(() => {
    // Optimized scroll handler
    const handleScroll = () => {
      if (!ticking.current) {
        requestAnimationFrame(() => {
          setShowScrollTop(window.scrollY > 300);
          ticking.current = false;
        });
        ticking.current = true;
      }
    };

    // Set up intersection observer for footer
    const footerObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setIsFooterVisible(entry.isIntersecting);
        });
      },
      {
        threshold: 0.1, // Trigger when 10% of footer is visible
        rootMargin: "0px 0px -100px 0px", // Start hiding a bit before footer is fully visible
      }
    );

    // Observe the footer element
    const footerElement = document.querySelector("footer");
    if (footerElement) {
      footerObserver.observe(footerElement);
    }

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (footerElement) {
        footerObserver.unobserve(footerElement);
      }
      footerObserver.disconnect();
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const scrollToContact = () => {
    const contactSection = document.getElementById("contact");
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-40 flex flex-col space-y-3 floating-menu">
      {/* Contact Button - Hide when footer is visible */}
      <AnimatePresence>
        {!isFooterVisible && (
          <motion.button
            onClick={scrollToContact}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ delay: 0.2 }}
            className="ml-1 mb-5 group relative flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 bg-white/20 dark:bg-white/10 backdrop-blur-lg rounded-full border border-white/20 hover:bg-primary/20 transition-all duration-300"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <Mail className="w-5 h-5 sm:w-6 sm:h-6 text-foreground group-hover:text-primary transition-colors" />

            {/* Tooltip - Only show on larger screens */}
            <div className="hidden sm:block absolute right-16 top-1/2 transform -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
              <div className="bg-foreground text-background px-3 py-1 rounded-lg text-sm whitespace-nowrap">
                Contact
              </div>
              <div className="absolute top-1/2 -right-1 transform -translate-y-1/2 w-2 h-2 bg-foreground rotate-45" />
            </div>
          </motion.button>
        )}
      </AnimatePresence>

      {/* Scroll to Top Button - Hide when footer is visible */}
      <AnimatePresence>
        {showScrollTop && !isFooterVisible && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            onClick={scrollToTop}
            className="group relative flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-r from-[#FF6B6B] to-orange-500 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 z-50"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <ChevronUp className="w-6 h-6 sm:w-7 sm:h-7 text-white" />

            {/* Ripple Effect */}
            <div className="absolute inset-0 rounded-full bg-white/20 scale-0 hover:scale-150 transition-transform duration-500" />

            {/* Tooltip - Only show on larger screens */}
            <div className="hidden sm:block absolute right-16 top-1/2 transform -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
              <div className="bg-white text-black px-3 py-1 rounded-lg text-sm whitespace-nowrap">
                Back to Top
              </div>
              <div className="absolute top-1/2 -right-1 transform -translate-y-1/2 w-2 h-2 bg-white rotate-45" />
            </div>
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
};

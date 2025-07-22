import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { ChevronUp, Mail, Github, Linkedin, Instagram } from "lucide-react";

export const FloatingActionMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const socialLinks = [
    { icon: Mail, href: "#contact", label: "Contact" },
    { icon: Github, href: "https://github.com/N00BSCOOB", label: "GitHub" },
    {
      icon: Linkedin,
      href: "http://linkedin.com/in/sayan-barma-ab0973289/",
      label: "LinkedIn",
    },
    {
      icon: Instagram,
      href: "https://www.instagram.com/barma_sayan/",
      label: "Instagram",
    },
  ];

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Social Links Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.2 }}
            className={`absolute ${
              showScrollTop ? "bottom-32" : "bottom-16"
            } right-0 flex flex-col space-y-3`}
          >
            {socialLinks.map((link, index) => (
              <motion.a
                key={link.label}
                href={link.href}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ delay: index * 0.1 }}
                className="group relative flex items-center justify-center w-12 h-12 bg-white/20 dark:bg-white/10 backdrop-blur-lg rounded-full border border-white/20 hover:bg-primary/20 transition-all duration-300"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <link.icon className="w-5 h-5 text-foreground group-hover:text-primary transition-colors" />

                {/* Tooltip */}
                <div className="absolute right-16 top-1/2 transform -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                  <div className="bg-foreground text-background px-3 py-1 rounded-lg text-sm whitespace-nowrap">
                    {link.label}
                  </div>
                  <div className="absolute top-1/2 -right-1 transform -translate-y-1/2 w-2 h-2 bg-foreground rotate-45" />
                </div>
              </motion.a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex flex-col space-y-3">
        {/* Scroll to Top Button */}
        <AnimatePresence>
          {showScrollTop && !isOpen && (
            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              onClick={scrollToTop}
              className="flex items-center justify-center w-12 h-12 bg-white/20 dark:bg-white/10 backdrop-blur-lg rounded-full border border-white/20 hover:bg-primary/20 transition-all duration-300"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <ChevronUp className="w-5 h-5 text-foreground" />
            </motion.button>
          )}
        </AnimatePresence>

        {/* Main FAB */}
        <motion.button
          onClick={() => setIsOpen(!isOpen)}
          className="relative flex items-center justify-center w-14 h-14 bg-gradient-to-r from-primary to-purple-600 rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          <motion.div
            animate={{ rotate: isOpen ? 45 : 0 }}
            transition={{ duration: 0.3 }}
            className="w-6 h-6 text-white"
          >
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-4 h-0.5 bg-white rounded-full" />
            </div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-0.5 h-4 bg-white rounded-full" />
            </div>
          </motion.div>

          {/* Ripple Effect */}
          <div className="absolute inset-0 rounded-full bg-white/20 scale-0 hover:scale-150 transition-transform duration-500" />
        </motion.button>
      </div>
    </div>
  );
};

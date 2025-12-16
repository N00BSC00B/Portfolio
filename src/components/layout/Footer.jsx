"use client";
import { ArrowUp, Github, Linkedin, Instagram, Mail } from "lucide-react";
import { motion } from "framer-motion";
import { GlassmorphismCard } from "../ui/GlassmorphismCard";

export const Footer = () => {
  const socialLinks = [
    {
      icon: Github,
      href: "https://github.com/N00BSC00B",
      label: "GitHub",
    },
    {
      icon: Linkedin,
      href: "https://www.linkedin.com/in/sayan-barma-ab0973289/",
      label: "LinkedIn",
    },
    {
      icon: Mail,
      href: "mailto:sayanbarma2005@gmail.com",
      label: "Email",
    },
    {
      icon: Instagram,
      href: "https://instagram.com/barma_sayan",
      label: "Instagram",
    },
  ];

  return (
    <footer className="relative py-12 px-4 mt-12 overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-background/40" />
      <div className="absolute inset-0">
        <div className="absolute top-1/2 left-1/4 w-32 h-32 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/3 w-40 h-40 bg-orange-500/10 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto max-w-4xl relative z-10">
        <GlassmorphismCard className="p-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
            {/* Logo/Brand */}
            <motion.div
              className="text-center md:text-left"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h3 className="text-2xl font-bold bg-gradient-to-r from-[#FF6B6B] to-orange-500 bg-clip-text text-transparent">
                Sayan Barma
              </h3>
              <p className="text-muted-foreground mt-2 text-sm">
                Building the future, one line at a time
              </p>
            </motion.div>

            {/* Social Links */}
            <motion.div
              className="flex justify-center gap-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              {socialLinks.map((link, index) => (
                <motion.a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-full bg-primary/10 hover:bg-primary/20 text-primary transition-all duration-300 group"
                  aria-label={link.label}
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
                >
                  <link.icon
                    size={20}
                    className="group-hover:scale-110 transition-transform"
                  />
                </motion.a>
              ))}
            </motion.div>

            {/* Back to Top + Copyright */}
            <motion.div
              className="text-center md:text-right space-y-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <motion.a
                href="#hero"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-[#FF6B6B]/10 to-orange-500/10 hover:from-[#FF6B6B]/20 hover:to-orange-500/20 text-[#FF6B6B] transition-all duration-300 group"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="text-sm font-medium">Back to Top</span>
                <ArrowUp
                  size={16}
                  className="group-hover:-translate-y-1 transition-transform"
                />
              </motion.a>
            </motion.div>
          </div>
        </GlassmorphismCard>
      </div>

      {/* Floating Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-primary/40 rounded-full"
            style={{
              left: `${20 + i * 25}%`,
              top: `${30 + i * 15}%`,
            }}
            animate={{
              y: [0, -20, 0],
              opacity: [0.2, 0.8, 0.2],
              scale: [1, 1.5, 1],
            }}
            transition={{
              duration: 4 + i,
              repeat: Infinity,
              delay: i * 0.8,
            }}
          />
        ))}
      </div>
    </footer>
  );
};

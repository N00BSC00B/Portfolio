"use client";
import { useState } from "react";
import { cn } from "../../lib/utils";
import { Code2, Globe, Wrench } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { ScrollReveal } from "../effects/ScrollReveal";
import { GlassmorphismCard } from "../ui/GlassmorphismCard";

const skillTabs = [
  { key: "lang", label: "Languages & Libraries", icon: Code2 },
  { key: "web", label: "Web & Backend Tech", icon: Globe },
  { key: "tools", label: "Tools & Concepts", icon: Wrench },
];

const skills = {
  lang: {
    Python:
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg",
    Java: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg",
    JavaScript:
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg",
    C: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/c/c-original.svg",
    "Scikit‑learn":
      "https://scikit-learn.org/stable/_static/scikit-learn-logo-small.png",
    TensorFlow:
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tensorflow/tensorflow-original.svg",
    Pandas:
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/pandas/pandas-original.svg",
    NumPy:
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/numpy/numpy-original.svg",
    BeautifulSoup:
      "https://www.crummy.com/software/BeautifulSoup/bs4/doc/_images/6.1.jpg",
    Selenium:
      "https://upload.wikimedia.org/wikipedia/commons/d/d5/Selenium_Logo.png",
    "Discord.py": "https://img.icons8.com/color/100/discord-logo.png",
    PyQt: "https://img.icons8.com/ios-filled/100/qt.png",
    Librosa: "https://avatars.githubusercontent.com/u/8189561?s=200&v=4",
    PyAudio: "https://avatars.githubusercontent.com/u/5288032?s=200&v=4",
  },
  web: {
    HTML: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg",
    CSS: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg",
    Flask:
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flask/flask-original.svg",
    FastAPI: "https://fastapi.tiangolo.com/img/logo-margin/logo-teal.png",
    Django:
      "https://static.djangoproject.com/img/logos/django-logo-negative.svg",
    Bootstrap:
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/bootstrap/bootstrap-original.svg",
    Jinja:
      "https://icons.veryicon.com/png/o/business/vscode-program-item-icon/jinja.png",
    WebSockets:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/c/cd/WebSocket_colored_logo.svg/1024px-WebSocket_colored_logo.svg.png",
    "RESTful APIs": "https://cdn-icons-png.flaticon.com/512/1006/1006771.png",
    SQLite:
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/sqlite/sqlite-original.svg",
    MySQL:
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg",
    PostgreSQL:
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg",
    MongoDB:
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg",
  },
  tools: {
    Git: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg",
    GitHub:
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg",
    Docker:
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg",
    "Data Visualization":
      "https://cdn-icons-png.flaticon.com/512/2721/2721296.png",
    "Unit Testing": "https://cdn-icons-png.flaticon.com/512/3601/3601603.png",
    RBAC: "https://cdn-icons-png.flaticon.com/512/1086/1086933.png",
    "CSV Handling": "https://cdn-icons-png.flaticon.com/512/4606/4606232.png",
    "RSA Encryption": "https://cdn-icons-png.flaticon.com/512/2917/2917995.png",
  },
};
export const SkillsSection = () => {
  const [active, setActive] = useState("lang");

  return (
    <section id="skills" className="py-24 px-4 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-48 h-48 bg-gradient-to-r from-orange-500 to-red-500 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto max-w-6xl relative z-10">
        <ScrollReveal>
          <motion.div className="text-left mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Technical{" "}
              <span className="bg-gradient-to-r from-[#FF6B6B] to-orange-500 bg-clip-text text-transparent">
                Skills
              </span>
            </h2>
            <p className="text-muted-foreground max-w-2xl">
              A comprehensive toolkit of technologies and frameworks I use to
              build modern applications
            </p>
          </motion.div>
        </ScrollReveal>

        {/* Enhanced Tabs */}
        <ScrollReveal delay={0.2}>
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {skillTabs.map(({ key, label, icon: Icon }, index) => (
              <motion.button
                key={key}
                onClick={() => setActive(key)}
                className={cn(
                  "relative flex items-center space-x-3 px-6 py-3 rounded-2xl transition-all duration-300 overflow-hidden",
                  active === key
                    ? "bg-gradient-to-r from-[#FF6B6B] to-orange-500 text-white shadow-lg"
                    : "bg-white/10 dark:bg-white/5 backdrop-blur-lg text-foreground hover:bg-white/20 dark:hover:bg-white/10 border border-white/20"
                )}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {/* Background glow for active tab */}
                {active === key && (
                  <motion.div
                    className="absolute inset-0"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  />
                )}

                <Icon
                  className={cn(
                    "h-5 w-5 relative z-10",
                    active === key ? "text-white" : "text-primary"
                  )}
                />
                <span className="font-medium text-sm md:text-base relative z-10">
                  {label}
                </span>

                {/* Shimmer effect */}
                {active === key && (
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] animate-[shimmer_2s_infinite] opacity-30" />
                )}
              </motion.button>
            ))}
          </div>
        </ScrollReveal>

        {/* Enhanced Skills Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 md:gap-6"
          >
            {Object.entries(skills[active]).map(([skill, icon], idx) => (
              <motion.div
                key={skill}
                initial={{ opacity: 0, scale: 0.8, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ delay: idx * 0.05, duration: 0.4 }}
                whileHover={{ y: -10, scale: 1.05 }}
                className="group"
              >
                <GlassmorphismCard className="p-4 md:p-6 text-center h-full flex flex-col items-center justify-center bg-gradient-to-br from-white/10 to-white/5 hover:from-[#FF6B6B]/20 hover:to-orange-500/20 transition-all duration-300 min-h-[120px]">
                  <motion.div
                    className="relative mb-3 flex items-center justify-center"
                    whileHover={{ rotate: [0, -10, 10, -10, 0] }}
                    transition={{ duration: 0.5 }}
                  >
                    <img
                      src={icon}
                      alt={skill}
                      className="w-12 h-12 md:w-14 md:h-14 object-contain filter group-hover:drop-shadow-lg transition-all duration-300"
                      loading="lazy"
                    />

                    {/* Glow effect on hover */}
                    <div className="absolute inset-0 bg-primary/20 rounded-full blur-lg scale-150 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </motion.div>

                  <motion.span
                    className="text-xs md:text-sm font-medium text-foreground group-hover:text-primary transition-colors duration-300 text-center leading-tight"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: idx * 0.05 + 0.2 }}
                  >
                    {skill}
                  </motion.span>

                  {/* Progress bar indicator */}
                  <motion.div
                    className="w-full h-1 bg-gradient-to-r from-[#FF6B6B]/30 to-orange-500/30 rounded-full mt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    initial={{ scaleX: 0 }}
                    whileHover={{ scaleX: 1 }}
                    transition={{ duration: 0.4 }}
                  />
                </GlassmorphismCard>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
};

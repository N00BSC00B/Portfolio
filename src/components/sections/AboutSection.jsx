"use client";
import { Briefcase, Code, User } from "lucide-react";
import { motion } from "framer-motion";
import { ScrollReveal } from "../effects/ScrollReveal";
import { GlassmorphismCard } from "../ui/GlassmorphismCard";

export const AboutSection = () => {
  const stats = [
    { number: "10+", label: "Projects Built" },
    { number: "2+", label: "Years Experience" },
    { number: "10+", label: "Technologies" },
    { number: "100%", label: "Passion" },
  ];

  return (
    <section id="about" className="py-24 px-4 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-primary/20 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-40 h-40 bg-orange-500/20 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto max-w-5xl relative z-10">
        <ScrollReveal>
          <motion.h2
            className="text-3xl md:text-4xl font-bold mb-12 text-left"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            About{" "}
            <span className="bg-gradient-to-r from-[#FF6B6B] to-orange-500 bg-clip-text text-transparent">
              Me
            </span>
          </motion.h2>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center text-left">
          <ScrollReveal delay={0.2}>
            <div className="space-y-6">
              <motion.h3
                className="text-2xl font-semibold"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
              >
                Full-Stack Developer & Python Enthusiast
              </motion.h3>

              <motion.p
                className="text-muted-foreground leading-relaxed"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                I&#39;m a B.Tech CSE student at BCET with a passion for building
                secure, performant, and user-friendly applications. I specialize
                in Python-based development and full-stack web solutions using
                FastAPI, Flask, and the MERN stack.
              </motion.p>

              <motion.p
                className="text-muted-foreground leading-relaxed"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                My projects span across web apps, Discord bots, automation
                tools, and hardware-software integrations. I&#39;m always
                exploring ways to combine backend efficiency with intuitive
                frontends using real-time technologies like WebSockets and PyQt.
              </motion.p>

              {/* Stats Section */}
              <motion.div
                className="grid grid-cols-2 gap-4 py-6"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                {stats.map((stat, index) => (
                  <GlassmorphismCard
                    key={index}
                    className="p-3 md:p-4 text-center"
                  >
                    <motion.div
                      initial={{ scale: 0.5 }}
                      whileInView={{ scale: 1 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                    >
                      <div className="text-2xl font-bold text-primary">
                        {stat.number}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {stat.label}
                      </div>
                    </motion.div>
                  </GlassmorphismCard>
                ))}
              </motion.div>

              <motion.div
                className="flex flex-col sm:flex-row gap-4 pt-4"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
              >
                <motion.a
                  href="#contact"
                  className="group relative inline-flex items-center justify-center px-8 py-3 text-lg font-semibold text-white bg-gradient-to-r from-[#FF6B6B] to-orange-500 rounded-full overflow-hidden transition-all duration-300 hover:shadow-2xl hover:shadow-[#FF6B6B]/25"
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span className="relative z-10">Get In Touch</span>
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-orange-500 to-red-500"
                    initial={{ x: "-100%" }}
                    whileHover={{ x: 0 }}
                    transition={{ duration: 0.3 }}
                  />
                </motion.a>

                <motion.a
                  href={`./resume.pdf`}
                  className="group relative inline-flex items-center justify-center px-8 py-3 text-lg font-semibold border-2 border-primary text-primary rounded-full overflow-hidden transition-all duration-300 hover:bg-primary hover:text-white"
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Resume
                </motion.a>
              </motion.div>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.3} direction="right">
            <div className="grid grid-cols-1 gap-6">
              {[
                {
                  icon: Code,
                  title: "Full-Stack Development",
                  description:
                    "Creating scalable apps with FastAPI, Flask, MongoDB, and modern front-end frameworks.",
                  gradient: "from-blue-500/20 to-cyan-500/20",
                },
                {
                  icon: User,
                  title: "UI/UX & Real-Time Features",
                  description:
                    "Designing smooth user interfaces and integrating real-time functionality with WebSockets and PyQt.",
                  gradient: "from-green-500/20 to-emerald-500/20",
                },
                {
                  icon: Briefcase,
                  title: "Project Experience",
                  description:
                    "From Discord bots and automation tools to Blender integrations and LED systems, I love building creative solutions.",
                  gradient: "from-orange-500/20 to-red-500/20",
                },
              ].map((card, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <GlassmorphismCard
                    className={`p-4 md:p-6 bg-gradient-to-br ${card.gradient} hover:scale-105 transition-transform duration-300`}
                  >
                    <div className="flex items-start gap-4">
                      <motion.div
                        className="p-3 rounded-full bg-primary/20 backdrop-blur-sm"
                        whileHover={{ scale: 1.1, rotate: 5 }}
                        transition={{ duration: 0.2 }}
                      >
                        <card.icon className="h-6 w-6 text-primary" />
                      </motion.div>
                      <div className="text-left flex-1">
                        <motion.h4
                          className="font-semibold text-lg mb-2"
                          initial={{ opacity: 0, y: 10 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.4, delay: 0.2 }}
                        >
                          {card.title}
                        </motion.h4>
                        <motion.p
                          className="text-muted-foreground leading-relaxed"
                          initial={{ opacity: 0, y: 10 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.4, delay: 0.3 }}
                        >
                          {card.description}
                        </motion.p>
                      </div>
                    </div>
                  </GlassmorphismCard>
                </motion.div>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
};

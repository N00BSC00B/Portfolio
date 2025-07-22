import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ScrollReveal } from "./ScrollReveal";
import { GlassmorphismCard } from "./GlassmorphismCard";
import { Calendar, ChevronDown, ChevronUp } from "lucide-react";

const getDuration = (start, end) => {
  const startDate = new Date(start);
  const endDate = end ? new Date(end) : new Date();

  let years = endDate.getFullYear() - startDate.getFullYear();
  let months = endDate.getMonth() - startDate.getMonth();

  if (months < 0) {
    years--;
    months += 12;
  }

  const y = years > 0 ? `${years} yr${years > 1 ? "s" : ""}` : "";
  const m = months > 0 ? `${months} mo${months > 1 ? "s" : ""}` : "";

  return [y, m].filter(Boolean).join(" ");
};

const formatShortDate = (dateStr) => {
  const options = { year: "numeric", month: "short" };
  return new Date(dateStr).toLocaleDateString("en-US", options);
};

export const ExperienceSection = () => {
  const [experiences, setExperiences] = useState([]);
  const [expanded, setExpanded] = useState({});

  useEffect(() => {
    const fetchExperiences = async () => {
      try {
        const res = await fetch(`./data/experience.json`);
        const data = await res.json();
        setExperiences(data);
      } catch (err) {
        console.error("Error loading experience:", err);
      }
    };

    fetchExperiences();
  }, []);

  const toggleExpand = (key) => {
    setExpanded((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <section
      id="experience"
      className="py-16 sm:py-20 lg:py-24 px-4 relative overflow-hidden"
    >
      {/* Background Effects */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-1/4 right-1/4 w-64 h-64 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 left-1/4 w-48 h-48 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto max-w-4xl relative z-10">
        <ScrollReveal>
          <motion.div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Professional{" "}
              <span className="bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
                Experience
              </span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              My journey through different roles and organizations, contributing
              to impactful projects and growing professionally
            </p>
          </motion.div>
        </ScrollReveal>

        <div className="space-y-6">
          {experiences.map((exp, key) => (
            <ScrollReveal key={key} delay={key * 0.1}>
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: key * 0.1, duration: 0.5 }}
              >
                <GlassmorphismCard className="p-6 hover:shadow-xl transition-all duration-300 border border-white/10">
                  <div className="flex flex-col md:flex-row md:items-start gap-4">
                    {/* Company Logo */}
                    <div className="flex-shrink-0">
                      <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-primary/20 to-purple-600/20 flex items-center justify-center border border-primary/30">
                        {exp.logoUrl ? (
                          <img
                            src={`./${exp.logoUrl}`}
                            alt={exp.company}
                            className="w-12 h-12 object-contain rounded-lg"
                          />
                        ) : (
                          <div className="w-12 h-12 rounded-lg bg-primary/30 flex items-center justify-center">
                            <span className="text-primary font-bold text-lg">
                              {exp.company.charAt(0)}
                            </span>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Experience Details */}
                    <div className="flex-1">
                      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-4">
                        <div>
                          <h3 className="text-xl font-bold text-foreground mb-1">
                            {exp.company}
                          </h3>
                          <div className="text-sm text-muted-foreground flex items-center gap-1 mb-2">
                            <Calendar size={14} />
                            <span>
                              {formatShortDate(exp.startDate)} -{" "}
                              {exp.endDate
                                ? formatShortDate(exp.endDate)
                                : "Present"}
                            </span>
                            <span className="text-primary font-medium ml-2">
                              ({getDuration(exp.startDate, exp.endDate)})
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Roles */}
                      <div className="space-y-4">
                        {exp.roles.map((role, roleIdx) => {
                          const desc = role.description;
                          const isExpanded = expanded[`${key}-${roleIdx}`];
                          const showMore =
                            Array.isArray(desc) && desc.length > 3;

                          return (
                            <motion.div
                              key={roleIdx}
                              className="relative pl-6 border-l-2 border-primary/30"
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: key * 0.1 + roleIdx * 0.05 }}
                            >
                              {/* Role Timeline Dot - aligned with date */}
                              <div className="absolute -left-1.5 top-8 w-3 h-3 bg-gradient-to-r from-primary to-purple-600 rounded-full shadow-lg" />

                              <div className="bg-white/5 dark:bg-white/5 rounded-lg p-4 border border-white/10">
                                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-3">
                                  <h4 className="text-lg font-semibold text-foreground">
                                    {role.title}
                                  </h4>
                                  <p className="text-xs text-primary font-medium flex items-center gap-1 flex-shrink-0">
                                    <Calendar size={12} />
                                    {formatShortDate(role.startDate)} –{" "}
                                    {role.endDate
                                      ? formatShortDate(role.endDate)
                                      : "Present"}{" "}
                                    ·{" "}
                                    {getDuration(role.startDate, role.endDate)}
                                  </p>
                                </div>

                                <AnimatePresence>
                                  <motion.ul
                                    className="list-disc text-sm text-muted-foreground space-y-1 ml-4"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                  >
                                    {Array.isArray(desc) ? (
                                      (isExpanded
                                        ? desc
                                        : desc.slice(0, 3)
                                      ).map((d, i) => (
                                        <motion.li
                                          key={i}
                                          initial={{ opacity: 0, x: -10 }}
                                          animate={{ opacity: 1, x: 0 }}
                                          transition={{ delay: i * 0.05 }}
                                          className="text-left"
                                        >
                                          {d}
                                        </motion.li>
                                      ))
                                    ) : (
                                      <li className="text-left">{desc}</li>
                                    )}
                                  </motion.ul>
                                </AnimatePresence>

                                {showMore && (
                                  <motion.button
                                    onClick={() =>
                                      toggleExpand(`${key}-${roleIdx}`)
                                    }
                                    className="text-primary text-sm font-medium hover:underline mt-3 flex items-center gap-1"
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                  >
                                    {isExpanded ? (
                                      <>
                                        Show less <ChevronUp size={14} />
                                      </>
                                    ) : (
                                      <>
                                        Read more <ChevronDown size={14} />
                                      </>
                                    )}
                                  </motion.button>
                                )}
                              </div>
                            </motion.div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </GlassmorphismCard>
              </motion.div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
};

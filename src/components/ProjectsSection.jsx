import { ArrowRight, ExternalLink, Github, X, ArrowLeft } from "lucide-react";
import { useEffect, useState, useCallback } from "react";
import ReactMarkdown from "react-markdown";
import { motion, AnimatePresence } from "framer-motion";
import { ScrollReveal } from "./ScrollReveal";
import { GlassmorphismCard } from "./GlassmorphismCard";

export const ProjectsSection = () => {
  const [projects, setProjects] = useState([]);
  const [selectedTags, setSelectedTags] = useState([]);
  const [activeProject, setActiveProject] = useState(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [itemsPerPage] = useState(3); // Show 3 projects per page
  const [showAllTags, setShowAllTags] = useState(false);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await fetch(`./data/projects.json`);
        const data = await res.json();
        setProjects(data);
      } catch (err) {
        console.error("Error loading projects:", err);
      }
    };
    fetchProjects();
  }, []);

  const validProjects = projects.filter((p) => p.tags && p.tags.length > 0);
  const allTags = Array.from(
    new Set(validProjects.flatMap((p) => p.tags || []))
  );

  const toggleTag = (tag) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
    setCurrentPage(0); // Reset to first page when filtering
  };

  const filteredProjects =
    selectedTags.length === 0
      ? projects
      : projects.filter((p) =>
          (p.tags || []).some((tag) => selectedTags.includes(tag))
        );

  // Pagination logic
  const totalPages = Math.ceil(filteredProjects.length / itemsPerPage);
  const currentProjects = filteredProjects.slice(
    currentPage * itemsPerPage,
    (currentPage + 1) * itemsPerPage
  );

  const nextPage = () => {
    setCurrentPage((prev) => (prev + 1) % totalPages);
  };

  const prevPage = () => {
    setCurrentPage((prev) => (prev - 1 + totalPages) % totalPages);
  };

  const showNextProject = useCallback(() => {
    if (activeProject) {
      const currentIndex = filteredProjects.findIndex(
        (p) => p.id === activeProject.id
      );
      const nextIndex = (currentIndex + 1) % filteredProjects.length;
      setActiveProject(filteredProjects[nextIndex]);
    }
  }, [activeProject, filteredProjects]);

  const showPreviousProject = useCallback(() => {
    if (activeProject) {
      const currentIndex = filteredProjects.findIndex(
        (p) => p.id === activeProject.id
      );
      const prevIndex =
        (currentIndex - 1 + filteredProjects.length) % filteredProjects.length;
      setActiveProject(filteredProjects[prevIndex]);
    }
  }, [activeProject, filteredProjects]);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (activeProject) {
        if (event.key === "ArrowRight") showNextProject();
        else if (event.key === "ArrowLeft") showPreviousProject();
        else if (event.key === "Escape") setActiveProject(null);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeProject, showNextProject, showPreviousProject]);

  return (
    <section id="projects" className="py-16 sm:py-20 lg:py-24 px-4 relative">
      <div className="container mx-auto max-w-5xl">
        <ScrollReveal>
          <motion.h2
            className="text-3xl md:text-4xl font-bold mb-4 text-left"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Featured{" "}
            <span className="bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
              {" "}
              Projects{" "}
            </span>
          </motion.h2>

          <p className="text-left text-muted-foreground mb-8 max-w-2xl">
            Here are some of my recent projects. Each project was carefully
            crafted with attention to detail, performance, and user experience.
          </p>
        </ScrollReveal>

        <ScrollReveal delay={0.2}>
          <GlassmorphismCard className="p-6 mb-8">
            {/* Tag filter buttons - improved system */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-foreground">
                  Filter Projects
                </h3>
                <div className="text-sm text-muted-foreground">
                  {filteredProjects.length} of {projects.length} projects
                </div>
              </div>

              <div className="flex flex-wrap gap-2 sm:gap-3">
                <motion.button
                  onClick={() => {
                    setSelectedTags([]);
                    setCurrentPage(0);
                  }}
                  className={`px-4 py-2 rounded-full text-xs sm:text-sm font-medium border transition-all duration-300 whitespace-nowrap transform hover:scale-105 ${
                    selectedTags.length === 0
                      ? "bg-gradient-to-r from-primary to-purple-600 text-white border-transparent shadow-lg"
                      : "bg-background/50 backdrop-blur-sm text-foreground hover:bg-primary/10 border-white/20"
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  All Projects
                </motion.button>

                {(showAllTags ? allTags : allTags.slice(0, 10)).map(
                  (tag, index) => (
                    <motion.button
                      key={tag}
                      onClick={() => toggleTag(tag)}
                      className={`px-4 py-2 rounded-full text-xs sm:text-sm font-medium border transition-all duration-300 whitespace-nowrap transform hover:scale-105 ${
                        selectedTags.includes(tag)
                          ? "bg-gradient-to-r from-primary to-purple-600 text-white border-transparent shadow-lg"
                          : "bg-background/50 backdrop-blur-sm text-foreground hover:bg-primary/10 border-white/20"
                      }`}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: index * 0.05, duration: 0.3 }}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      {tag}
                    </motion.button>
                  )
                )}

                {allTags.length > 10 && (
                  <motion.button
                    onClick={() => setShowAllTags(!showAllTags)}
                    className="px-4 py-2 rounded-full text-xs sm:text-sm font-medium border bg-muted/50 text-muted-foreground hover:bg-primary/10 border-white/20 transition-all duration-300"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {showAllTags ? `Show Less` : `+${allTags.length - 10} More`}
                  </motion.button>
                )}
              </div>

              {selectedTags.length > 0 && (
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <span>Active filters:</span>
                  <div className="flex flex-wrap gap-1">
                    {selectedTags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-1 rounded bg-primary/20 text-primary text-xs"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <button
                    onClick={() => {
                      setSelectedTags([]);
                      setCurrentPage(0);
                    }}
                    className="text-primary hover:underline text-xs ml-2"
                  >
                    Clear all
                  </button>
                </div>
              )}
            </div>
          </GlassmorphismCard>
        </ScrollReveal>

        {/* Projects Grid with Pagination */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentPage}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8"
          >
            {currentProjects.map((project, key) => {
              const fullDescriptionText = project.description.join("\n");
              const characterLimit = 150; // More space for 3-per-page layout
              const needsTruncation =
                fullDescriptionText.length > characterLimit;
              const displayDescription = needsTruncation
                ? fullDescriptionText.substring(0, characterLimit) + "..."
                : fullDescriptionText;

              return (
                <ScrollReveal key={project.id || key} delay={key * 0.1}>
                  <motion.div
                    onClick={() => setActiveProject(project)}
                    className="cursor-pointer group h-full"
                    whileHover={{ y: -5 }}
                    transition={{ duration: 0.3 }}
                  >
                    <GlassmorphismCard className="overflow-hidden h-full flex flex-col">
                      <div className="relative h-48 sm:h-52 lg:h-56 overflow-hidden">
                        <motion.img
                          src={`./${project.image}`}
                          alt={project.title}
                          className="w-full h-full object-cover"
                          whileHover={{ scale: 1.05 }}
                          transition={{ duration: 0.5 }}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        <motion.div
                          className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                          initial={{ scale: 0.8 }}
                          whileHover={{ scale: 1 }}
                        >
                          <div className="bg-white/20 backdrop-blur-sm border border-white/30 rounded-full px-4 py-1.5 text-white font-medium text-xs sm:text-sm">
                            View Details
                          </div>
                        </motion.div>
                      </div>

                      <div className="p-6 flex-1 flex flex-col">
                        <div className="flex flex-wrap gap-2 mb-4">
                          {project.tags?.slice(0, 3).map((tag, idx) => (
                            <motion.span
                              key={tag + idx}
                              className="px-3 py-1 text-xs font-medium rounded-full bg-gradient-to-r from-primary/20 to-purple-600/20 text-primary border border-primary/30"
                              initial={{ opacity: 0, scale: 0.8 }}
                              animate={{ opacity: 1, scale: 1 }}
                              transition={{ delay: idx * 0.05 }}
                              whileHover={{ scale: 1.05 }}
                            >
                              {tag}
                            </motion.span>
                          ))}
                          {project.tags?.length > 3 && (
                            <span className="px-3 py-1 text-xs font-medium rounded-full bg-muted text-muted-foreground">
                              +{project.tags.length - 3}
                            </span>
                          )}
                        </div>

                        <motion.h3
                          className="text-xl font-semibold mb-3 group-hover:text-primary transition-colors duration-300"
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.2 }}
                        >
                          {project.title}
                        </motion.h3>

                        <motion.div
                          className="text-muted-foreground text-sm mb-4 flex-1"
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.3 }}
                        >
                          <div className="line-clamp-4">
                            <ReactMarkdown>{displayDescription}</ReactMarkdown>
                          </div>
                          {needsTruncation && (
                            <span className="text-primary font-medium hover:underline text-sm">
                              Read more →
                            </span>
                          )}
                        </motion.div>
                      </div>
                    </GlassmorphismCard>
                  </motion.div>
                </ScrollReveal>
              );
            })}
          </motion.div>
        </AnimatePresence>

        {/* Pagination Controls */}
        {totalPages > 1 && (
          <ScrollReveal delay={0.4}>
            <div className="flex items-center justify-center gap-4 mt-8">
              <motion.button
                onClick={prevPage}
                disabled={currentPage === 0}
                className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 dark:bg-white/5 backdrop-blur-lg border border-white/20 hover:bg-primary/20 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <ArrowLeft size={16} />
                <span className="text-sm">Previous</span>
              </motion.button>

              <div className="flex items-center gap-2">
                {Array.from({ length: totalPages }, (_, i) => (
                  <motion.button
                    key={i}
                    onClick={() => setCurrentPage(i)}
                    className={`w-8 h-8 rounded-full text-sm font-medium transition-all duration-300 ${
                      currentPage === i
                        ? "bg-gradient-to-r from-primary to-purple-600 text-white"
                        : "bg-white/10 dark:bg-white/5 text-foreground hover:bg-primary/20"
                    }`}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    {i + 1}
                  </motion.button>
                ))}
              </div>

              <motion.button
                onClick={nextPage}
                disabled={currentPage === totalPages - 1}
                className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 dark:bg-white/5 backdrop-blur-lg border border-white/20 hover:bg-primary/20 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="text-sm">Next</span>
                <ArrowRight size={16} />
              </motion.button>
            </div>
          </ScrollReveal>
        )}

        <ScrollReveal delay={0.4}>
          <div className="text-left mt-12">
            <motion.a
              className="group relative inline-flex items-center gap-3 px-8 py-4 text-lg font-semibold text-white bg-gradient-to-r from-primary to-purple-600 rounded-full overflow-hidden transition-all duration-300 hover:shadow-2xl hover:shadow-primary/25"
              target="_blank"
              href="https://github.com/N00BSC00B"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              <Github className="w-5 h-5" />
              <span className="relative z-10">Check My GitHub</span>
              <motion.div
                initial={{ x: 0 }}
                whileHover={{ x: 5 }}
                transition={{ duration: 0.3 }}
              >
                <ArrowRight size={20} />
              </motion.div>

              {/* Animated Background */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600"
                initial={{ x: "-100%" }}
                whileHover={{ x: 0 }}
                transition={{ duration: 0.3 }}
              />

              {/* Shimmer Effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
            </motion.a>
          </div>
        </ScrollReveal>
      </div>

      {/* Project modal */}
      {activeProject && (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center px-4">
          {filteredProjects.length > 1 && (
            <button
              className="absolute left-4 sm:left-8 top-1/2 -translate-y-1/2 p-3 rounded-full bg-gray-200/50 dark:bg-zinc-700/50 hover:bg-gray-300 dark:hover:bg-zinc-600 transition-colors z-[60] text-zinc-700 dark:text-zinc-200 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
              onClick={(e) => {
                e.stopPropagation();
                showPreviousProject();
              }}
              aria-label="Previous Project"
            >
              <ArrowLeft size={28} />
            </button>
          )}

          <div className="bg-white dark:bg-zinc-900 rounded-lg max-w-2xl w-full p-6 relative shadow-lg max-h-[90vh] overflow-y-auto text-left custom-scrollbar">
            <button
              className="absolute top-3 right-3 text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-100 p-2 rounded-full hover:bg-gray-100 dark:hover:bg-zinc-800 transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
              onClick={() => setActiveProject(null)}
              aria-label="Close Project Details"
            >
              <X size={20} />
            </button>

            <img
              src={`./${activeProject.image}`}
              alt={activeProject.title}
              className="w-full object-cover rounded-md mb-4"
            />
            <h3 className="text-2xl font-bold mb-2">{activeProject.title}</h3>
            <div className="flex flex-wrap gap-2 mb-4">
              {activeProject.tags?.map((tag, idx) => (
                <span
                  key={tag + idx}
                  className="px-2 py-1 text-xs font-medium border rounded-full bg-secondary text-secondary-foreground"
                >
                  {tag}
                </span>
              ))}
            </div>
            <div className="space-y-2 text-muted-foreground text-sm mb-4">
              <ReactMarkdown>
                {activeProject.description.map((d) => `- ${d}`).join("\n")}
              </ReactMarkdown>
            </div>
            <div className="flex space-x-3">
              {activeProject.demoUrl && (
                <a
                  href={activeProject.demoUrl}
                  target="_blank"
                  className="text-foreground/80 hover:text-primary transition-colors duration-300"
                  rel="noopener noreferrer"
                >
                  <ExternalLink size={20} />
                </a>
              )}
              {activeProject.githubUrl && (
                <a
                  href={activeProject.githubUrl}
                  target="_blank"
                  className="text-foreground/80 hover:text-primary transition-colors duration-300"
                  rel="noopener noreferrer"
                >
                  <Github size={20} />
                </a>
              )}
            </div>
          </div>

          {filteredProjects.length > 1 && (
            <button
              className="absolute right-4 sm:right-8 top-1/2 -translate-y-1/2 p-3 rounded-full bg-gray-200/50 dark:bg-zinc-700/50 hover:bg-gray-300 dark:hover:bg-zinc-600 transition-colors z-[60] text-zinc-700 dark:text-zinc-200 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
              onClick={(e) => {
                e.stopPropagation();
                showNextProject();
              }}
              aria-label="Next Project"
            >
              <ArrowRight size={28} />
            </button>
          )}
        </div>
      )}
    </section>
  );
};

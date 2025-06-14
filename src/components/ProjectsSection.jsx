import { ArrowRight, ExternalLink, Github, X, ArrowLeft } from "lucide-react";
import { useEffect, useState, useCallback } from "react";
import ReactMarkdown from "react-markdown";

export const ProjectsSection = () => {
  const [projects, setProjects] = useState([]);
  const [selectedTags, setSelectedTags] = useState([]);
  const [filterMode, setFilterMode] = useState("or"); // New filter mode state
  const [activeProject, setActiveProject] = useState(null);

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
  };

  const filteredProjects =
    selectedTags.length === 0
      ? projects
      : filterMode === "or"
      ? projects.filter((p) =>
          (p.tags || []).some((tag) => selectedTags.includes(tag))
        )
      : projects.filter((p) =>
          selectedTags.every((tag) => (p.tags || []).includes(tag))
        );

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
    <section id="projects" className="py-24 px-4 relative">
      <div className="container mx-auto max-w-5xl">
        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-left">
          Featured <span className="text-primary"> Projects </span>
        </h2>

        <p className="text-left text-muted-foreground mb-8 max-w-2xl">
          Here are some of my recent projects. Each project was carefully
          crafted with attention to detail, performance, and user experience.
        </p>

        {/* Filter mode selector */}
        <div className="flex items-center gap-4 mb-4">
          <div className="text-sm text-muted-foreground">Match:</div>
          <select
            value={filterMode}
            onChange={(e) => setFilterMode(e.target.value)}
            className="px-2 py-1 border rounded-md bg-background text-sm"
          >
            <option value="or">Any (OR)</option>
            <option value="and">All (AND)</option>
          </select>
        </div>

        {/* Tag buttons */}
        <div className="flex flex-wrap gap-2 sm:gap-4 mb-8">
          {allTags.map((tag) => (
            <button
              key={tag}
              onClick={() => toggleTag(tag)}
              className={`px-3 py-1 rounded-full text-sm font-medium border transition-colors duration-300 whitespace-nowrap ${
                selectedTags.includes(tag)
                  ? "bg-primary text-primary-foreground"
                  : "bg-background text-foreground hover:bg-secondary"
              }`}
            >
              {tag}
            </button>
          ))}
        </div>

        <div className="overflow-x-auto custom-scrollbar pb-2">
          <div className="flex space-x-6 min-w-max">
            {filteredProjects.map((project, key) => {
              const fullDescriptionText = project.description.join("\n");
              const characterLimit = 100;
              const needsTruncation =
                fullDescriptionText.length > characterLimit;
              const displayDescription = needsTruncation
                ? fullDescriptionText.substring(0, characterLimit) + "..."
                : fullDescriptionText;

              return (
                <div
                  key={key}
                  onClick={() => setActiveProject(project)}
                  className="group bg-card rounded-lg overflow-hidden shadow-xs card-hover w-80 flex-shrink-0 cursor-pointer"
                >
                  <div className="max-h-48 overflow-hidden">
                    <img
                      src={`./${project.image}`}
                      alt={project.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                  </div>

                  <div className="p-6 text-left">
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.tags?.map((tag, idx) => (
                        <span
                          key={tag + idx}
                          className="px-2 py-1 text-xs font-medium border rounded-full bg-secondary text-secondary-foreground"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    <h3 className="text-xl font-semibold mb-1">
                      {project.title}
                    </h3>

                    <div className="text-muted-foreground text-sm mb-4">
                      <ReactMarkdown>{displayDescription}</ReactMarkdown>
                      {needsTruncation && (
                        <span className="italic">Click to read more</span>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="text-left mt-12">
          <a
            className="cosmic-button w-fit flex items-center gap-2"
            target="_blank"
            href="https://github.com/N00BSC00B"
            rel="noopener noreferrer"
          >
            Check My Github <ArrowRight size={16} />
          </a>
        </div>
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

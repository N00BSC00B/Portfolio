import { useEffect, useState } from "react";

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
    <section id="experience" className="py-24 px-4 relative">
      <div className="container mx-auto max-w-4xl">
        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-left">
          Work <span className="text-primary">Experience</span>
        </h2>
        <p className="text-muted-foreground mb-12 max-w-2xl text-left">
          A timeline of my professional roles and responsibilities.
        </p>

        <div className="space-y-8">
          {experiences.map((exp, idx) => (
            <div key={idx} className="bg-card p-6 rounded-xl shadow-md">
              <div className="flex items-start space-x-4 mb-4">
                <img
                  src={`./${exp.logoUrl}`}
                  alt={exp.company}
                  className="w-12 h-12 object-contain rounded-md border"
                />
                <div>
                  <h3 className="text-lg font-semibold text-left">
                    {exp.company}
                  </h3>
                  <p className="text-sm text-muted-foreground text-left">
                    {formatShortDate(exp.startDate)} –{" "}
                    {exp.endDate ? formatShortDate(exp.endDate) : "Present"} ·{" "}
                    {getDuration(exp.startDate, exp.endDate)}
                  </p>
                </div>
              </div>

              {exp.roles.map((role, roleIdx) => {
                const desc = role.description;
                const isExpanded = expanded[`${idx}-${roleIdx}`];
                const showMore = Array.isArray(desc) && desc.length > 3;
                return (
                  <div
                    key={roleIdx}
                    className="relative pl-6 border-l-2 border-primary mb-6"
                  >
                    <div className="absolute -left-1 top-2 w-3 h-3 bg-primary rounded-full" />
                    <h4 className="text-md font-medium mt-1 text-left">
                      {role.title}
                    </h4>
                    <p className="text-xs text-muted-foreground mb-1 text-left">
                      {formatShortDate(role.startDate)} –{" "}
                      {role.endDate ? formatShortDate(role.endDate) : "Present"}{" "}
                      · {getDuration(role.startDate, role.endDate)}
                    </p>
                    <ul className="list-disc pl-5 text-sm text-muted-foreground text-left">
                      {Array.isArray(desc) ? (
                        (isExpanded ? desc : desc.slice(0, 3)).map((d, i) => (
                          <li key={i}>{d}</li>
                        ))
                      ) : (
                        <li>{desc}</li>
                      )}
                    </ul>
                    {showMore && (
                      <button
                        onClick={() => toggleExpand(`${idx}-${roleIdx}`)}
                        className="text-primary text-sm mt-2 text-left"
                      >
                        {isExpanded ? "Show less" : "Read more"}
                      </button>
                    )}
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

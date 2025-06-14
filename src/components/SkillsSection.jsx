import { useState } from "react";
import { cn } from "../lib/utils";
import { Code2, Globe, Wrench } from "lucide-react";

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
      "https://static-00.iconduck.com/assets.00/django-icon-1606x2048-lwmw1z73.png",
    Bootstrap:
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/bootstrap/bootstrap-original.svg",
    Jinja:
      "https://static-00.iconduck.com/assets.00/file-type-jinja-icon-2048x1932-gji4nbe3.png",
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
    <section id="skills" className="py-24 px-4 bg-secondary/30">
      <div className="container mx-auto max-w-5xl">
        <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
          Technical <span className="text-primary">Skills</span>
        </h2>

        {/* Tabs */}
        <div className="flex flex-wrap justify-center gap-3 sm:gap-4 mb-8 px-2">
          {skillTabs.map(({ key, label, icon: Icon }) => (
            <button
              key={key}
              onClick={() => setActive(key)}
              className={cn(
                "flex items-center space-x-2 px-4 py-2 rounded-full transition",
                active === key
                  ? "bg-primary text-primary-foreground"
                  : "bg-secondary/70 text-foreground hover:bg-secondary/80"
              )}
            >
              <Icon className="h-5 w-5" />
              <span>{label}</span>
            </button>
          ))}
        </div>

        {/* Skills Grid with Icons */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {Object.entries(skills[active]).map(([skill, icon], idx) => (
            <div
              key={idx}
              className="flex flex-col items-center justify-center text-center p-4 bg-primary/80 text-gray-800 rounded-xl shadow hover:bg-primary hover:text-primary-foreground hover:shadow-lg hover:scale-105 transition-all duration-300"
            >
              <img
                src={icon}
                alt={skill}
                className="w-[70px] h-[70px] object-contain mb-2"
              />
              <span className="text-sm font-medium">{skill}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

import { Briefcase, Code, User } from "lucide-react";

export const AboutSection = () => {
  return (
    <section id="about" className="py-24 px-4 relative">
      <div className="container mx-auto max-w-5xl">
        <h2 className="text-3xl md:text-4xl font-bold mb-12 text-left">
          About <span className="text-primary">Me</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center text-left">
          <div className="space-y-6">
            <h3 className="text-2xl font-semibold">
              Full-Stack Developer & Python Enthusiast
            </h3>

            <p className="text-muted-foreground">
              I&#39;m a B.Tech CSE student at BCET with a passion for building
              secure, performant, and user-friendly applications. I specialize
              in Python-based development and full-stack web solutions using
              FastAPI, Flask, and the MERN stack.
            </p>

            <p className="text-muted-foreground">
              My projects span across web apps, Discord bots, automation tools,
              and hardware-software integrations. I&#39;m always exploring ways
              to combine backend efficiency with intuitive frontends using
              real-time technologies like WebSockets and PyQt.
            </p>

            <div className="text-center flex flex-col sm:flex-row gap-4 pt-4 justify-center">
              <a href="#contact" className="cosmic-button">
                Get In Touch
              </a>

              <a
                href={`./resume.pdf`}
                className="px-6 py-2 rounded-full border border-primary text-primary hover:bg-primary/10 transition-colors duration-300"
              >
                Resume
              </a>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-6">
            {/* Full-Stack Development Card */}
            <div className="gradient-border p-[1px] rounded-xl card-hover">
              <div className="bg-primary/20 rounded-xl p-5">
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-full bg-primary/10">
                    <Code className="h-6 w-6 text-primary" />
                  </div>
                  <div className="text-left">
                    <h4 className="font-semibold text-lg">
                      Full-Stack Development
                    </h4>
                    <p className="text-muted-foreground">
                      Creating scalable apps with FastAPI, Flask, MongoDB, and
                      modern front-end frameworks.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* UI/UX & Real-Time Features Card */}
            <div className="gradient-border p-[1px] rounded-xl card-hover">
              <div className="bg-primary/20 rounded-xl p-5">
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-full bg-primary/10">
                    <User className="h-6 w-6 text-primary" />
                  </div>
                  <div className="text-left">
                    <h4 className="font-semibold text-lg">
                      UI/UX & Real-Time Features
                    </h4>
                    <p className="text-muted-foreground">
                      Designing smooth user interfaces and integrating real-time
                      functionality with WebSockets and PyQt.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Project Experience Card */}
            <div className="gradient-border p-[1px] rounded-xl card-hover">
              <div className="bg-primary/20 rounded-xl p-5">
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-full bg-primary/10">
                    <Briefcase className="h-6 w-6 text-primary" />
                  </div>
                  <div className="text-left">
                    <h4 className="font-semibold text-lg">
                      Project Experience
                    </h4>
                    <p className="text-muted-foreground">
                      From Discord bots and automation tools to Blender
                      integrations and LED systems, I love building creative
                      solutions.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

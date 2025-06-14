import { ArrowDown } from "lucide-react";

export const HeroSection = () => {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col items-center justify-center px-4"
    >
      <div className="container max-w-4xl mx-auto text-center md:text-left z-10">
        {" "}
        {/* Adjusted text alignment for larger screens */}
        <div className="md:flex md:items-center md:space-x-8">
          {" "}
          {/* Flex container for image and text */}
          {/* Your Picture */}
          <div className="flex-shrink-0 mb-8 md:mb-0 md:w-1/3 flex justify-center">
            {" "}
            {/* Centered on small, left on large */}
            <img
              src="/favicon.png" // <--- IMPORTANT: Change this to your image path
              alt="Sayan Barma"
              className="rounded-full w-75 h-75 object-cover border-4 border-primary shadow-lg animate-fade-in" // Slightly larger image
            />
          </div>
          <div className="space-y-6 md:w-2/3">
            {" "}
            {/* Text content takes remaining space */}
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
              <span className="opacity-0 animate-fade-in"> Hi, I&#39;m</span>
              <span className="text-primary opacity-0 animate-fade-in-delay-1">
                {" "}
                Sayan
              </span>
              <span className="text-gradient ml-2 opacity-0 animate-fade-in-delay-2">
                Barma
              </span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-2-2xl mx-auto md:mx-0 opacity-0 animate-fade-in-delay-3">
              <span className="text-primary">Full-Stack Developer</span> with a
              passion for crafting secure and scalable applications. I build
              intuitive user experiences and robust systems across various
              domains, from real-time communication and AI assistants to data
              scraping and desktop GUIs.
            </p>
            <div className="pt-4 opacity-0 animate-fade-in-delay-4">
              <a href="#projects" className="cosmic-button">
                View My Work
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center animate-bounce">
        <span className="text-sm text-muted-foreground mb-2"> Scroll </span>
        <ArrowDown className="h-5 w-5 text-primary" />
      </div>
    </section>
  );
};

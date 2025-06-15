export const HeroSection = () => {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col items-start justify-center px-4 md:px-6 lg:px-8 pt-12" // Reduced top padding
    >
      <div className="container max-w-4xl mx-auto text-left z-10">
        <div className="md:flex md:items-center md:space-x-8">
          {/* Your Picture */}
          <div className="flex-shrink-0 mb-8 md:mb-0 md:w-1/3 lg:w-2/4 flex justify-center md:justify-start">
            <img
              src="/favicon.jpg"
              alt="Sayan Barma"
              className="rounded-full object-cover border-4 border-primary shadow-lg animate-fade-in
      w-48 h-48       // ~128px for small screens
      sm:w-52 sm:h-52 // ~80px for slightly larger
      md:w-56 md:h-56 // ~112px for medium screens
      lg:w-80 lg:h-80 // ~288px for large screens
      xl:w-96 xl:h-96 // ~384px for extra large screens
      "
            />
          </div>

          <div className="space-y-6 md:w-2/3">
            <h1 className="text-3xl md:text-5xl font-bold tracking-tight">
              <span className="opacity-0 animate-fade-in">Hi, I&#39;m</span>
              <span className="text-primary opacity-0 animate-fade-in-delay-1">
                {" "}
                Sayan
              </span>
              <span className="text-gradient ml-2 opacity-0 animate-fade-in-delay-2">
                Barma
              </span>
            </h1>
            <p className="text-base md:text-lg text-muted-foreground max-w-2xl opacity-0 animate-fade-in-delay-3">
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
    </section>
  );
};

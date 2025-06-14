import { Link } from "react-router-dom";
import { StarBackground } from "@/components/StarBackground";
import { Navbar } from "@/components/Navbar";
import { ThemeToggle } from "@/components/ThemeToggle";

const NotFound = () => {
  return (
    <div className="relative min-h-screen bg-background text-foreground overflow-x-hidden">
      {/* Theme Toggle */}
      <ThemeToggle />

      {/* Background Effects */}
      <StarBackground />

      {/* Navbar */}
      <Navbar />

      {/* Content */}
      <div className="flex flex-col items-center justify-center text-center px-4 py-32 relative z-10">
        <h1 className="text-6xl md:text-7xl font-bold mb-4">404</h1>
        <p className="text-xl md:text-2xl mb-2">Page Not Found</p>
        <p className="text-muted-foreground mb-6">
          The page you’re looking for doesn’t exist or has been moved.
        </p>
        <Link
          to="/"
          className="px-6 py-3 rounded-full bg-primary text-primary-foreground font-semibold hover:bg-primary/90 transition-colors duration-300"
        >
          Return Home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;

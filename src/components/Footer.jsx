import { ArrowUp } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="py-12 px-4 bg-card relative border-t border-border mt-12 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4 sm:gap-0">
      <small className="text-sm text-muted-foreground">
        &copy; {new Date().getFullYear()} Sayan Barma | All rights reserved.
      </small>
      <a
        href="#hero"
        className="p-2 rounded-full bg-primary/10 hover:bg-primary/20 text-primary transition-colors"
        aria-label="Back to top"
      >
        <ArrowUp size={20} />
      </a>
    </footer>
  );
};

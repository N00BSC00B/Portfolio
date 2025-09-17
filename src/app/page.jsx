// FILE: app/page.jsx

import { HomePage } from "../components/HomePage";

export const metadata = {
  // --- CHANGES START HERE ---
  title: "Sayan Barma | Full-Stack & AI Developer Portfolio",
  description:
    "Explore the portfolio of Sayan Barma, a full-stack developer with expertise in backend systems using Python (FastAPI, Django) and creating AI-powered automation pipelines.",
  keywords: [
    "Sayan Barma portfolio",
    "Full-Stack Developer India",
    "Python Backend Developer",
    "FastAPI developer",
    "AI automation projects",
    "React developer portfolio",
    "n8n automation expert",
    "Freelance backend developer",
    "LLM application developer",
    "Cross-platform app developer",
    "Blender API integration",
  ],
  // --- CHANGES END HERE ---
  verification: {
    // ❗️ IMPORTANT: Replace with your actual code from Google Search Console
    google: "8NdeUz6ZRRacYGVtETynz1sy_d2y2lA5BLddURjxeNc",
  },
  alternates: {
    canonical: "https://sayan-barma-portfolio.netlify.app",
  },
};

export default function Page() {
  // Pass your projects data to the HomePage component
  return <HomePage />;
}

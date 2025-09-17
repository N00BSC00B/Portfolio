// FILE: app/layout.jsx

import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata = {
  // --- CHANGES START HERE ---
  metadataBase: new URL("https://sayan-barma-portfolio.netlify.app"),
  title: {
    default: "Sayan Barma | Full-Stack & AI Developer",
    template: "%s | Sayan Barma",
  },
  description:
    "Portfolio of Sayan Barma, a Computer Science student and Full-Stack Developer specializing in Python, FastAPI, React, and AI-driven automation solutions.",
  keywords: [
    "Sayan Barma",
    "Full-Stack Developer",
    "Backend Developer",
    "Python Developer",
    "AI Developer",
    "Automation Engineer",
    "FastAPI",
    "React.js",
    "Django",
    "n8n",
    "LLM Integration",
    "Portfolio",
    "JavaScript",
    "Web Developer",
  ],
  // --- CHANGES END HERE ---
  authors: [
    { name: "Sayan Barma", url: "https://sayan-barma-portfolio.netlify.app" },
  ],
  creator: "Sayan Barma",
  publisher: "Sayan Barma",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://sayan-barma-portfolio.netlify.app",
    title: "Sayan Barma | Full-Stack & AI Developer",
    description:
      "Portfolio of Sayan Barma, a Full-Stack Developer specializing in Python, FastAPI, React, and AI-driven automation solutions.",
    siteName: "Sayan Barma Portfolio",
    images: [
      {
        url: "/social-preview.jpg",
        width: 1200,
        height: 630,
        alt: "Sayan Barma Portfolio Preview",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Sayan Barma | Full-Stack & AI Developer",
    description:
      "Portfolio of Sayan Barma - a developer focused on backend systems, AI, and automation.",
    images: ["/social-preview.jpg"],
    creator: "@sayanbarma",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  manifest: "/manifest.json",
};

export default function RootLayout({ children }) {
  const personJsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Sayan Barma",
    url: "https://sayan-barma-portfolio.netlify.app",
    email: "sayanbarma2004@gmail.com",
    jobTitle: "Full-Stack & AI Developer",
    image: "https://sayan-barma-portfolio.netlify.app/social-preview.jpg",
    sameAs: [
      "https://github.com/N00BSC00B",
      "https://linkedin.com/in/sayan-barma-ab0973289",
      "https://twitter.com/sayanbarma",
    ],
    alumniOf: {
      "@type": "CollegeOrUniversity",
      name: "Bengal College of Engineering and Technology (BCET), Durgapur",
    },
    // --- SKILLS POPULATED FROM YOUR RESUME ---
    knowsAbout: [
      "Python",
      "Java",
      "JavaScript",
      "C",
      "HTML",
      "CSS",
      "Flask",
      "FastAPI",
      "Django",
      "WebSockets",
      "React.js",
      "MySQL",
      "MongoDB",
      "PostgreSQL",
      "SQLite",
      "Git",
      "GitHub",
      "n8n",
      "Electron",
      "Capacitor",
      "Vite",
      "Scikit-learn",
      "TensorFlow",
      "Pandas",
      "NumPy",
      "PyQt",
      "Selenium",
      "BeautifulSoup",
      "Discord.py",
      "Automation",
      "AI/LLM Integration",
      "RBAC",
      "Data Visualization",
      "RSA Cryptography",
      "Unit Testing",
    ],
    description:
      "Computer Science and Engineering undergraduate with practical experience in full-stack development, AI-driven automation, and cross-platform applications.",
    address: {
      "@type": "PostalAddress",
      addressCountry: "IN",
    },
  };

  const websiteJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Sayan Barma | Full-Stack & AI Developer Portfolio",
    url: "https://sayan-barma-portfolio.netlify.app",
    description:
      "Portfolio of Sayan Barma, a Full-Stack Developer specializing in Python, FastAPI, React, and AI-driven automation solutions.",
    author: {
      "@type": "Person",
      name: "Sayan Barma",
    },
    inLanguage: "en-US",
    copyrightYear: new Date().getFullYear(),
    copyrightHolder: {
      "@type": "Person",
      name: "Sayan Barma",
    },
  };

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
        />
      </head>
      <body className={`${inter.variable} antialiased`}>{children}</body>
    </html>
  );
}

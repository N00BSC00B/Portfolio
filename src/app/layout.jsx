import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

export const viewport = {
  themeColor: "#0a0a0a",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export const metadata = {
  metadataBase: new URL("https://sayan-barma-portfolio.netlify.app/"),
  title: {
    default: "Sayan Barma | Portfolio",
    template: "%s | Sayan Barma",
  },
  description:
    "Portfolio of Sayan Barma - Full-Stack Developer focused on backend systems, AI, and automation. Specializing in building exceptional digital experiences.",
  keywords: [
    "Sayan Barma",
    "Portfolio",
    "Full Stack Developer",
    "Web Developer",
    "React Developer",
    "Next.js Developer",
    "Frontend Developer",
    "Software Engineer",
    "JavaScript",
    "TypeScript",
    "AI Integration",
    "Backend Development",
    "Automation",
    "System Architecture",
  ],
  authors: [{ name: "Sayan Barma", url: "https://github.com/N00BSC00B" }],
  creator: "Sayan Barma",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://sayan-barma-portfolio.netlify.app/",
    title: "Sayan Barma | Portfolio",
    description:
      "Portfolio of Sayan Barma - Full-Stack Developer focused on backend systems, AI, and automation.",
    siteName: "Sayan Barma Portfolio",
    images: [
      {
        url: "/social-preview.jpg",
        width: 1200,
        height: 630,
        alt: "Sayan Barma Portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Sayan Barma | Portfolio",
    description:
      "Portfolio of Sayan Barma - Full-Stack Developer focused on backend systems, AI, and automation.",
    images: ["/social-preview.jpg"],
    creator: "@SayanBarma", // Placeholder if unknown
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png",
    other: [
      {
        rel: "icon",
        type: "image/png",
        sizes: "192x192",
        url: "/icon-192.png",
      },
      {
        rel: "icon",
        type: "image/png",
        sizes: "512x512",
        url: "/icon-512.png",
      },
    ],
  },
  manifest: "/manifest.json",
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
};

export default function RootLayout({ children }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Sayan Barma",
    url: "https://sayan-barma-portfolio.netlify.app/",
    sameAs: [
      "https://github.com/N00BSC00B",
      "https://linkedin.com/in/sayan-barma",
    ],
    jobTitle: "Full-Stack Developer",
    knowsAbout: [
      "React",
      "Next.js",
      "AI",
      "Backend Systems",
      "Automation",
      "JavaScript",
      "TypeScript",
    ],
    description:
      "Full-Stack Developer focused on backend systems, AI, and automation.",
  };

  return (
    <html lang="en" suppressHydrationWarning>
      <body className="antialiased bg-background text-foreground custom-scrollbar overflow-x-hidden">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {children}
        <Toaster />
      </body>
    </html>
  );
}

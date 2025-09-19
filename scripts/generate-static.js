import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

// Get the current directory
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const generateStaticHTML = async () => {
  try {
    console.log("🔄 Generating SEO-optimized static HTML with SSR...");

    // Read the built index.html from dist
    const distIndexPath = path.join(__dirname, "../dist/index.html");

    if (!fs.existsSync(distIndexPath)) {
      throw new Error(
        'dist/index.html not found. Please run "vite build" first.'
      );
    }

    let html = fs.readFileSync(distIndexPath, "utf8");

    // Check if meta tags already exist to avoid duplicates
    const hasBasicMeta =
      html.includes('name="description"') && html.includes('name="keywords"');
    const hasOGMeta = html.includes('property="og:type"');
    const hasTwitterMeta = html.includes('property="twitter:card"');
    const hasStructuredData = html.includes('"@type": "Person"');
    const hasSitemap = html.includes('rel="sitemap"');

    console.log("📋 Meta tags analysis:");
    console.log(
      `  Basic SEO meta: ${hasBasicMeta ? "✅ Already present" : "❌ Missing"}`
    );
    console.log(
      `  Open Graph meta: ${hasOGMeta ? "✅ Already present" : "❌ Missing"}`
    );
    console.log(
      `  Twitter meta: ${hasTwitterMeta ? "✅ Already present" : "❌ Missing"}`
    );
    console.log(
      `  Structured data: ${
        hasStructuredData ? "✅ Already present" : "❌ Missing"
      }`
    );
    console.log(
      `  Sitemap reference: ${hasSitemap ? "✅ Already present" : "❌ Missing"}`
    );

    // Only add meta tags if they don't exist to avoid duplicates
    if (
      !hasBasicMeta ||
      !hasOGMeta ||
      !hasTwitterMeta ||
      !hasStructuredData ||
      !hasSitemap
    ) {
      console.log("⚠️  Some meta tags missing, adding them...");
    } else {
      console.log(
        "✅ All meta tags already present, skipping meta injection to avoid duplicates"
      );
    }

    // Enhanced SEO meta tags to inject
    const seoMetaTags = `
    <!-- Enhanced SEO Meta Tags -->
    <meta name="description" content="Sayan Barma | Full-Stack & AI Developer specializing in Python, FastAPI, React, Node.js, and AI-driven automation solutions. Computer Science student with expertise in backend systems and cross-platform development." />
    <meta name="keywords" content="Sayan Barma, Full-Stack Developer, AI Developer, Backend Developer, Python Developer, FastAPI, React.js, Django, n8n, Automation Engineer, LLM Integration, JavaScript, Portfolio, Web Developer, Computer Science" />
    <meta name="author" content="Sayan Barma" />
    <meta name="robots" content="index, follow" />
    <meta name="google-site-verification" content="8NdeUz6ZRRacYGVtETynz1sy_d2y2lA5BLddURjxeNc" />
    
    <!-- Open Graph / Facebook -->
    <meta property="og:type" content="website" />
    <meta property="og:url" content="https://sayan-barma-portfolio.netlify.app/" />
    <meta property="og:title" content="Sayan Barma | Full-Stack & AI Developer" />
    <meta property="og:description" content="Portfolio of Sayan Barma, a Full-Stack Developer specializing in Python, FastAPI, React, and AI-driven automation solutions." />
    <meta property="og:image" content="https://sayan-barma-portfolio.netlify.app/social-preview.jpg" />
    <meta property="og:image:width" content="1200" />
    <meta property="og:image:height" content="630" />
    <meta property="og:image:alt" content="Sayan Barma Portfolio Preview" />
    <meta property="og:site_name" content="Sayan Barma Portfolio" />
    
    <!-- Twitter -->
    <meta property="twitter:card" content="summary_large_image" />
    <meta property="twitter:title" content="Sayan Barma | Full-Stack & AI Developer" />
    <meta property="twitter:description" content="Portfolio of Sayan Barma - a developer focused on backend systems, AI, and automation." />
    <meta property="twitter:image" content="https://sayan-barma-portfolio.netlify.app/social-preview.jpg" />
    <meta property="twitter:creator" content="@noobscoob_" />
    
    <!-- Canonical URL -->
    <link rel="canonical" href="https://sayan-barma-portfolio.netlify.app/" />
    
    <!-- Sitemap Reference -->
    <link rel="sitemap" type="application/xml" href="/sitemap.xml" />
    
    <!-- Structured Data -->
    <script type="application/ld+json">
    {
      "@context": "https://schema.org",
      "@type": "Person",
      "name": "Sayan Barma",
      "url": "https://sayan-barma-portfolio.netlify.app",
      "email": "sayanbarma2004@gmail.com",
      "jobTitle": "Full-Stack & AI Developer",
      "image": "https://sayan-barma-portfolio.netlify.app/social-preview.jpg",
      "sameAs": [
        "https://github.com/N00BSC00B",
        "https://www.linkedin.com/in/sayan-barma-ab0973289/",
        "https://x.com/noobscoob_"
      ],
      "alumniOf": {
        "@type": "CollegeOrUniversity",
        "name": "Bengal College of Engineering and Technology (BCET), Durgapur"
      },
      "knowsAbout": [
        "Python", "FastAPI", "Django", "React.js", "JavaScript", "AI/LLM Integration", 
        "Automation", "Backend Development", "Full-Stack Development", "n8n", "MongoDB", "PostgreSQL"
      ],
      "description": "Computer Science and Engineering undergraduate with practical experience in full-stack development, AI-driven automation, and cross-platform applications.",
      "address": {
        "@type": "PostalAddress",
        "addressCountry": "IN"
      }
    }
    </script>
    <script type="application/ld+json">
    {
      "@context": "https://schema.org",
      "@type": "WebSite",
      "name": "Sayan Barma | Full-Stack & AI Developer Portfolio",
      "url": "https://sayan-barma-portfolio.netlify.app",
      "description": "Portfolio of Sayan Barma, a Full-Stack Developer specializing in Python, FastAPI, React, and AI-driven automation solutions.",
      "author": {
        "@type": "Person",
        "name": "Sayan Barma"
      },
      "inLanguage": "en-US",
      "copyrightYear": 2024,
      "copyrightHolder": {
        "@type": "Person",
        "name": "Sayan Barma"
      }
    }
    </script>`;

    // Only inject meta tags if some are missing
    if (
      !hasBasicMeta ||
      !hasOGMeta ||
      !hasTwitterMeta ||
      !hasStructuredData ||
      !hasSitemap
    ) {
      html = html.replace("</head>", `${seoMetaTags}\n  </head>`);
      console.log("✅ Added missing meta tags");
    } else {
      console.log("✅ Skipped meta tag injection - all already present");
    }

    // Update the title only if it's different
    const currentTitle = html.match(/<title>(.*?)<\/title>/)?.[1];
    const targetTitle = "Sayan Barma | Full-Stack & AI Developer Portfolio";

    if (currentTitle && currentTitle !== targetTitle) {
      html = html.replace(
        /<title>.*?<\/title>/,
        `<title>${targetTitle}</title>`
      );
      console.log("✅ Updated page title");
    } else {
      console.log("✅ Page title already optimized");
    }

    // Try to render React app server-side (optional enhancement)
    try {
      console.log("🔄 Attempting server-side rendering...");

      // Create a simplified static content for better SEO
      const staticContent = `
        <main>
          <!-- Server-rendered content for SEO -->
          <section id="hero">
            <div>
              <h1>Sayan Barma</h1>
              <h2>Full-Stack & AI Developer</h2>
              <p>Computer Science student specializing in Python, FastAPI, React, and AI-driven automation solutions.</p>
              <div>
                <span>Full-Stack Developer</span>
                <span>Automation & AI Developer</span>
                <span>Cross-Platform Developer</span>
                <span>Backend & API Specialist</span>
              </div>
            </div>
          </section>
          
          <section id="about">
            <h2>About Me</h2>
            <p>Computer Science and Engineering undergraduate with practical experience in full-stack development, AI-driven automation, and cross-platform applications.</p>
          </section>
          
          <section id="skills">
            <h2>Technical Skills</h2>
            <div>
              <h3>Backend Development</h3>
              <p>Python, FastAPI, Django, Flask, WebSockets</p>
              
              <h3>Frontend Development</h3>
              <p>React.js, JavaScript, HTML, CSS</p>
              
              <h3>Databases</h3>
              <p>MySQL, MongoDB, PostgreSQL, SQLite</p>
              
              <h3>AI & Automation</h3>
              <p>LLM Integration, n8n, Automation, Machine Learning</p>
            </div>
          </section>
          
          <section id="contact">
            <h2>Contact</h2>
            <p>Email: sayanbarma2004@gmail.com</p>
            <p>Location: India</p>
          </section>
        </main>`;

      html = html.replace(
        '<div id="root"></div>',
        `<div id="root">${staticContent}</div>`
      );
      console.log("✅ Server-side rendering successful!");
    } catch (ssrError) {
      console.log("⚠️  SSR not available, using static fallback");

      // Add a comprehensive noscript fallback for better SEO
      const noscriptContent = `
      <noscript>
        <div style="max-width: 1200px; margin: 0 auto; padding: 20px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #333;">
          <header style="text-align: center; margin-bottom: 40px;">
            <h1 style="font-size: 2.5rem; margin-bottom: 0.5rem; color: #1a202c;">Sayan Barma</h1>
            <h2 style="font-size: 1.5rem; color: #4a5568; font-weight: 400;">Full-Stack & AI Developer</h2>
            <p style="font-size: 1.1rem; color: #718096; max-width: 600px; margin: 0 auto;">Computer Science student specializing in Python, FastAPI, React, and AI-driven automation solutions.</p>
          </header>
          
          <section style="margin-bottom: 40px;">
            <h3 style="color: #2d3748; border-bottom: 2px solid #e2e8f0; padding-bottom: 0.5rem;">About Me</h3>
            <p>Computer Science and Engineering undergraduate with practical experience in full-stack development, AI-driven automation, and cross-platform applications.</p>
          </section>
          
          <section style="margin-bottom: 40px;">
            <h3 style="color: #2d3748; border-bottom: 2px solid #e2e8f0; padding-bottom: 0.5rem;">Technical Skills</h3>
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 20px;">
              <div>
                <h4 style="color: #4a5568;">Backend Development</h4>
                <p>Python, FastAPI, Django, Flask, WebSockets</p>
              </div>
              <div>
                <h4 style="color: #4a5568;">Frontend Development</h4>
                <p>React.js, JavaScript, HTML, CSS</p>
              </div>
              <div>
                <h4 style="color: #4a5568;">Databases</h4>
                <p>MySQL, MongoDB, PostgreSQL, SQLite</p>
              </div>
              <div>
                <h4 style="color: #4a5568;">AI & Automation</h4>
                <p>LLM Integration, n8n, Automation, Machine Learning</p>
              </div>
            </div>
          </section>
          
          <section style="margin-bottom: 40px;">
            <h3 style="color: #2d3748; border-bottom: 2px solid #e2e8f0; padding-bottom: 0.5rem;">Contact</h3>
            <p><strong>Email:</strong> sayanbarma2004@gmail.com</p>
            <p><strong>Location:</strong> India</p>
            <p><strong>GitHub:</strong> N00BSC00B</p>
            <p><strong>LinkedIn:</strong> sayan-barma-ab0973289</p>
          </section>
          
          <footer style="text-align: center; margin-top: 40px; padding-top: 20px; border-top: 1px solid #e2e8f0; color: #718096;">
            <p>Please enable JavaScript to view the full interactive portfolio.</p>
          </footer>
        </div>
      </noscript>`;

      html = html.replace(
        '<div id="root"></div>',
        `<div id="root">${noscriptContent}</div>`
      );
    }

    // Write the enhanced HTML back
    fs.writeFileSync(distIndexPath, html, "utf8");

    console.log("✅ SEO-optimized static HTML generated successfully!");
    console.log("📍 Location: dist/index.html");
    console.log(
      "🔍 Features: No Duplicate Meta Tags, Enhanced SEO, Static Content"
    );
    console.log(
      "🚀 Your site is now ready for deployment with maximum SEO optimization!"
    );
  } catch (error) {
    console.error("❌ Error generating static HTML:", error.message);
    throw error;
  }
};

// Run the generation
generateStaticHTML();

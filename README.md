# Portfolio Next.js Migration

This is the migrated version of your React + Vite portfolio, now using **Next.js 15.5.3** for superior SEO performance.

## 🚀 Key Improvements

### SEO Enhancements

- **Static HTML Generation**: Search engines can now immediately crawl your content
- **Rich Meta Tags**: Proper Open Graph and Twitter Card metadata for better social sharing
- **Optimized Images**: Next.js Image component provides automatic optimization
- **Fast Loading**: Static generation ensures instant page loads
- **Better Indexing**: Server-side HTML generation improves search engine discoverability

### Technical Stack

- **Next.js 15.5.3** with App Router
- **React 19.1.0** with latest features
- **TypeScript** for better development experience
- **Tailwind CSS v4** with zero-config setup
- **Framer Motion** for smooth animations
- **Static Export** for optimal performance

## 📁 Project Structure

```
portfolio-nextjs/
├── src/
│   ├── app/
│   │   ├── layout.tsx       # Root layout with SEO metadata
│   │   ├── page.tsx         # Main portfolio page
│   │   └── globals.css      # Global styles
│   ├── components/          # All React components
│   ├── hooks/              # Custom React hooks
│   ├── lib/                # Utility libraries
│   └── utils/              # Helper functions
├── public/                 # Static assets
├── out/                    # Built static site (after npm run build)
├── netlify.toml           # Netlify deployment configuration
└── next.config.ts         # Next.js configuration
```

## 🛠️ Development

### Install Dependencies

```bash
npm install
```

### Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view in development.

### Build for Production

```bash
npm run build
```

This creates an optimized static export in the `out/` directory.

### Test Production Build Locally

```bash
cd out
python -m http.server 8080
```

Open [http://localhost:8080](http://localhost:8080) to test the production build.

## 🌐 Deployment

### Netlify Deployment

1. **Build Command**: `npm run build`
2. **Publish Directory**: `out`
3. **Node Version**: 18+

The `netlify.toml` file is already configured with:

- Proper redirects for SPA routing
- Security headers
- Cache optimization for static assets

### Manual Deployment

Simply upload the contents of the `out/` directory to any static hosting service.

## 📊 Performance Benefits

| Metric         | Before (Vite)       | After (Next.js) | Improvement |
| -------------- | ------------------- | --------------- | ----------- |
| SEO Score      | Limited             | Excellent       | 🚀 Major    |
| First Load     | Client-side         | Server-side     | ⚡ Faster   |
| Crawlability   | JavaScript Required | Static HTML     | 🔍 Better   |
| Social Sharing | Basic               | Rich Previews   | 📱 Enhanced |

## 🔧 Configuration

### Next.js Config

The `next.config.ts` is configured for static export with:

- Image optimization disabled (required for static export)
- Trailing slashes enabled
- Package import optimization

### SEO Metadata

Each page includes comprehensive metadata:

- Open Graph tags for social media
- Twitter Card data
- Structured data for search engines
- Proper title and description tags

## 🚨 Important Notes

1. **Images**: All images now use Next.js `Image` component for optimization
2. **Routing**: Client-side routing replaced with scroll-to-section navigation
3. **Static Export**: Site generates as static HTML/CSS/JS for maximum compatibility
4. **Build Size**: Optimized bundle size with code splitting

## 🐛 Troubleshooting

### Build Issues

- Ensure all `"use client"` directives are at the top of component files
- Check that all imports are properly resolved
- Verify image paths start with `/` for public folder assets

### Runtime Issues

- Check browser console for any JavaScript errors
- Ensure all animation libraries are properly imported
- Verify data files are accessible in the `public/data/` directory

## 📈 SEO Checklist

- ✅ Static HTML generation
- ✅ Meta tags and Open Graph data
- ✅ Optimized images with proper alt text
- ✅ Semantic HTML structure
- ✅ Fast loading times
- ✅ Mobile-responsive design
- ✅ Proper heading hierarchy
- ✅ Social media preview cards

Your portfolio is now fully optimized for search engines and will perform significantly better in search rankings!

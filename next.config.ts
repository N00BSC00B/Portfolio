import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  trailingSlash: true,
  skipTrailingSlashRedirect: true,
  images: {
    unoptimized: true, // Required for static export
  },
  // Environment variables configuration for static export
  env: {
    NEXT_PUBLIC_WEBHOOK_URL: process.env.NEXT_PUBLIC_WEBHOOK_URL,
  },
  // Disable server-side features that don't work with static export
  experimental: {
    // Optimize bundle size
    optimizePackageImports: ['framer-motion', 'lucide-react'],
  },
  // Optimize for static sites
  reactStrictMode: true,
};

export default nextConfig;

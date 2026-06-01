import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Serve modern formats — Next.js auto-converts PNG/JPG to WebP/AVIF
    formats: ["image/avif", "image/webp"],
    // Reasonable size steps for responsive images
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    // Cache optimised images for 60 days
    minimumCacheTTL: 60 * 60 * 24 * 60,
  },
  // Compress all responses
  compress: true,
  // Remove X-Powered-By header (minor security + perf)
  poweredByHeader: false,
};

export default nextConfig;

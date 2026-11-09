import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Hide the dev-only "N" indicator (bottom-left). Compile/runtime errors still show.
  devIndicators: false,
  images: {
    formats: ["image/avif", "image/webp"],
    qualities: [60, 75, 85],
  },
  async redirects() {
    return [{ source: "/", destination: "/kz", permanent: false }];
  },
};

export default nextConfig;

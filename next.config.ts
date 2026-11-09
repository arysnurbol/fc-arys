import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
    qualities: [60, 75, 85],
  },
  async redirects() {
    return [{ source: "/", destination: "/kz", permanent: false }];
  },
};

export default nextConfig;

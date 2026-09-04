import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "*.r2.cloudflarestorage.com", // Or your custom public domain if configured
      },
    ],
  },
};

export default nextConfig;

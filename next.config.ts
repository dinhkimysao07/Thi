import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  turbopack: {
    root: process.cwd(),
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "mia.vn",
      },
      {
        protocol: "https",
        hostname: "imagevietnam.vnanet.vn",
      },
      {
        protocol: "https",
        hostname: "mangdentrip.com",
      },
      {
        protocol: "https",
        hostname: "caonguyentourist.com",
      },
    ],
  },
};

export default nextConfig;

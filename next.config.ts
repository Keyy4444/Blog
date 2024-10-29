import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: false,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**", // Allows any hostname
        port: "", // No specific port
        pathname: "/**", // Allows any path
      },
    ],
  },
};

export default nextConfig;

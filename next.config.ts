import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  webpack: (config) => {
    config.resolve.modules = [
      ...(config.resolve.modules ?? ["node_modules"]),
      path.resolve(__dirname, "node_modules"),
    ];
    return config;
  },
  experimental: {
    serverActions: {
      bodySizeLimit: "5mb",
    },
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
      },
    ],
  },
  async rewrites() {
    return [
      { source: "/", destination: "/es-mx/home" },
      { source: "/home", destination: "/es-mx/home" },
      { source: "/adopt", destination: "/es-mx/adopt" },
      { source: "/donate", destination: "/es-mx/donate" },
      { source: "/volunteer", destination: "/es-mx/volunteer" },
      { source: "/contact", destination: "/es-mx/contact" },
      { source: "/login", destination: "/es-mx/login" },
      { source: "/register", destination: "/es-mx/register" },
    ];
  },
};

export default nextConfig;

import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      { source: "/", destination: "/es-mx/home" },
      { source: "/home", destination: "/es-mx/home" },
      { source: "/adopt", destination: "/es-mx/adopt" },
      { source: "/donate", destination: "/es-mx/donate" },
      { source: "/volunteer", destination: "/es-mx/volunteer" },
      { source: "/contact", destination: "/es-mx/contact" },
    ];
  },
};

export default nextConfig;

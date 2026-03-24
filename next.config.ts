import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [new URL("https://res.cloudinary.com/optimus-media/**")],
    qualities: [75, 80],
  },
};

export default nextConfig;

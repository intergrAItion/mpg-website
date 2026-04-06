import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  images: {
    // Optimise local placeholder images
    // Place logo.png and hero.jpg in /public before deploying
    localPatterns: [
      {
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;

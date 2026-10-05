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
  async headers() {
    return [{
      source: "/:path*",
      headers: [
        { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
        { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
      ],
    }];
  },
  async redirects() {
    return [
      { source: '/pricing', destination: '/quote', permanent: true }
    ]
  }
};

export default nextConfig;

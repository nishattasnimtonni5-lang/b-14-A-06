import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Verified against the live API (https://api.api-store.workers.dev/api/fitlog):
    // all 12 workout images are served from img.magnific.com. If the API ever
    // adds another image host, add it here — otherwise next/image returns 400.
    remotePatterns: [
      {
        protocol: "https",
        hostname: "img.magnific.com",
      },
    ],
  },
};

export default nextConfig;

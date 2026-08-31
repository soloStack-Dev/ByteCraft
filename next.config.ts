import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Vercel uses its own serverless pipeline — standalone is only needed
  // for self-hosted / Docker deployments where the .next/standalone
  // directory is copied into the runner stage.
  output: process.env.VERCEL ? undefined : "standalone",
  images: {
    remotePatterns: [],
    qualities: [25, 50, 75, 100],
  },
  async headers() {
    return [
      {
        source: "/:path*{/}?",
        headers: [
          {
            key: "X-Accel-Buffering",
            value: "no",
          },
        ],
      },
    ];
  },
};

export default nextConfig;

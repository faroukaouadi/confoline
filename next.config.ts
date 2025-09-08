import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Enable static export (replaces `next export`)
  output: "export",
  // Needed because we use next/image with static export
  images: {
    unoptimized: true,
  },
};

export default nextConfig;

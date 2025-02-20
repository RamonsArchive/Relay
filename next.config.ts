import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    domains: ["cdn.sanity.io", "lh3.googleusercontent.com"], // ✅ Allow Sanity images
  },
  experimental: {
    ppr: "incremental",
  }
};

export default nextConfig;

import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    domains: ["cdn.sanity.io", "lh3.googleusercontent.com"], // ✅ Allow Sanity images
  },
  experimental: {
    ppr: "incremental",
    serverActions: {
      bodySizeLimit: "5mb",
    }
  }
};

export default nextConfig;

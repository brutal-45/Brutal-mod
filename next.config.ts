import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  /* config options here */
  typescript: {
    ignoreBuildErrors: true,
  },
  reactStrictMode: false,
  allowedDevOrigins: [
    "preview-chat-5cd5104c-a85d-4f07-9075-91a0ce883c95.space-z.ai",
    ".space-z.ai",
  ],
};

export default nextConfig;

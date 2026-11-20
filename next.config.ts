import type { NextConfig } from "next";
import path from "node:path";
const nextConfig: NextConfig = {
  reactStrictMode: true,
  devIndicators: false,
  poweredByHeader: false,
  turbopack: { root: path.resolve(".") },
  outputFileTracingRoot: path.resolve("."),
};
export default nextConfig;

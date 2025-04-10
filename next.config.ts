import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    // 原神资源加载
    remotePatterns: [
      {
        protocol: "https",
        hostname: "yuanshen.site",
        pathname: "/imgs/**",
      },
      {
        protocol: "https",
        hostname: "another-domain.com",
        pathname: "/images/**",
      },
    ],
    domains: [
      "oaidalleapiprodscus.blob.core.windows.net"
    ],
  },
};

export default nextConfig;

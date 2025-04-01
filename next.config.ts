import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  // 原神资源加载
  images: {
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
  },
};

export default nextConfig;

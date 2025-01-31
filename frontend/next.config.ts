import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    domains: ["localhost"], // Разрешаем загрузку с backend (3001)
  },
};

export default nextConfig;

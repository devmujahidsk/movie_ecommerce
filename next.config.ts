import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "image.tmdb.org",
        pathname: "/t/p/**", // ✅ Allow all images from TMDB
      },
      {
        protocol: "https",
        hostname: "fakestoreapi.com",
        pathname: "/img/**", // ✅ Allow all images from FakeStoreAPI
      },
    ],
  },
};

export default nextConfig;

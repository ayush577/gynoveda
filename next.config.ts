import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/admin",
        destination: "/admin/scheduled-meetings",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;

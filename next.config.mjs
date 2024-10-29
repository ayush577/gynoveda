const nextConfig = {
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

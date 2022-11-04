/** @type {import("next").NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  rewrites: async () => [
    {
      source: "/api/:path*",
      destination: "http://localhost:3000/:path*",
    },
  ],
};

module.exports = nextConfig;

/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  images: {
    domains: ["github.githubassets.com"],
  },
};

module.exports = nextConfig;

/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  images: {
    domains: ["github.githubassets.com", "flagcdn.com", "upload.wikimedia.org"],
  },
};

module.exports = nextConfig;

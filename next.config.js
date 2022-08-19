/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ["tmdb.org", "themoviedb.org", "image.tmdb.org"],
  },
};

module.exports = nextConfig;

/** @type {import('next').NextConfig} */
const nextConfig = {}

module.exports = {
  nextConfig,
  images: {
    domains: ['i.seadn.io'],
  },
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback.fs = false;
    }
    return config;
  },
}
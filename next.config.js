/** @type {import('next').NextConfig} */
const nextConfig = {
  // Explicitly use the app directory at root level
  experimental: {
    // Ensure we use the root app directory
  },
  // Ignore the src directory for pages routing
  pageExtensions: ['tsx', 'ts', 'jsx', 'js'],
};

module.exports = nextConfig;

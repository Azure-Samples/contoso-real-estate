/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
  images: {
    loader: "default",
    domains: ["localhost"],
  },
  output: "standalone",
}

module.exports = nextConfig

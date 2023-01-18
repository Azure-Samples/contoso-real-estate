/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
  images: {
    loader: "default",
    remotePatterns: [
      {
        protocol: "https",
        hostname: "*.blob.core.windows.net",
        port: "",
        pathname: "/strapi/assets/**",
      },
      {
        protocol: "http",
        hostname: "localhost",
        port: "1337",
        pathname: "**",
      },
    ],
  },
  output: "standalone",
}

module.exports = nextConfig

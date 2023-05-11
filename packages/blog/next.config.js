/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  images: {
    loader: "default",
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**.azurecontainerapps.io",
        port: "",
        pathname: "**",
      },
      {
        protocol: "https",
        hostname: "*.blob.core.windows.net",
        port: "",
        pathname: "**",
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

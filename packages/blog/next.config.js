/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
  images: {
    loader: "default",
    domains: ["localhost", process.env.NEXT_STRAPI_IMAGE_HOST || ""],
  },
  output: "standalone",
}

module.exports = nextConfig

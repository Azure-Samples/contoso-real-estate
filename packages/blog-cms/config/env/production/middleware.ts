export default [
  {
    name: "strapi::security",
    config: {
      contentSecurityPolicy: {
        useDefaults: true,
        directives: {
          "connect-src": ["'self'", "https:"],
          "img-src": ["'self'", "data:", "blob:", process.env.STORAGE_URL, process.env.STORAGE_CDN_URL],
          "media-src": ["'self'", "data:", "blob:", process.env.STORAGE_URL, process.env.STORAGE_CDN_URL],
          upgradeInsecureRequests: null,
        },
      },
    },
  },
];

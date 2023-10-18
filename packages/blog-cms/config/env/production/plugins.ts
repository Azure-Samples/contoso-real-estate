export default ({ env }) => {
  const hasStorageAccount = env("STORAGE_ACCOUNT");
  if (!hasStorageAccount) {
    console.warn("Azure Storage account not configured. Skipping upload provider configuration.");
    return {};
  }
  return {
    upload: {
      config: {
        provider: "strapi-provider-upload-azure-storage",
        providerOptions: {
          account: env("STORAGE_ACCOUNT"),
          accountKey: env("STORAGE_ACCOUNT_KEY"),
          serviceBaseURL: env("STORAGE_URL"),
          containerName: env("STORAGE_CONTAINER_NAME"),
          cdnBaseURL: env("STORAGE_CDN_URL"),
          defaultPath: "assets",
          maxConcurrent: 10,
        },
      },
    },
    graphql: {
      config: {
        endpoint: "/graphql",
        shadowCRUD: true,
        playgroundAlways: false,
        depthLimit: 7,
        amountLimit: 100,
        apolloServer: {
          tracing: false,
        },
      },
    },
  };
};

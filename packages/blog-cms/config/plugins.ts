export default {
  //
  graphql: {
    enabled: true,
    config: {
      endpoint: "/graphql",
      shadowCRUD: true,
      playgroundAlways: true,
      depthLimit: 7,
      amountLimit: 100,
      generateArtifacts: true,
      apolloServer: {
        tracing: false,
        introspection: true,
      },
    },
  },
};

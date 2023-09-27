import fp from 'fastify-plugin'
import Stripe from 'stripe';

// The use of fastify-plugin is required to be able
// to export the decorators to the outer scope
export default fp(async (fastify, opts) => {
  const config = fastify.config;
  if (!config.secretKey || !config.publicKey || !config.webhookSecret) {
    fastify.decorate('stripe', undefined);
  } else {
    fastify.decorate('stripe', new Stripe(config.secretKey, { apiVersion: '2023-08-16' }));
  }
}, {
  name: 'stripe',
  dependencies: ['config'],
});

// When using .decorate you have to specify added properties for Typescript
declare module 'fastify' {
  export interface FastifyInstance {
    stripe: Stripe | undefined;
  }
}

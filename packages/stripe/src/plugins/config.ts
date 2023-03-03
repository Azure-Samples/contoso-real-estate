import process from 'node:process';
import fp from 'fastify-plugin'

export interface AppConfig {
  publicKey: string;
  secretKey: string;
  webhookSecret: string;
  webAppUrl: string;
  apiUrl: string;
}

// The use of fastify-plugin is required to be able
// to export the decorators to the outer scope
export default fp(async (fastify, opts) => {
  const config: AppConfig = {
    publicKey: process.env.STRIPE_PUBLIC_KEY || '',
    secretKey: process.env.STRIPE_SECRET_KEY || '',
    webhookSecret: process.env.STRIPE_WEBHOOK_SECRET || '',
    webAppUrl: process.env.WEB_APP_URL || 'http://localhost:4280',
    apiUrl: process.env.API_URL || 'http://localhost:7071'
  };

  if (!config.publicKey || !config.secretKey || !config.webhookSecret) {
    fastify.log.warn(`Stripe keys are missing!`);
    fastify.log.warn(`Payment process will be mocked and all payments will be successful,`);
    fastify.log.warn(`DO NOT USE FOR PRODUCTION!`);
  }

  fastify.decorate('config', config);
}, {
  name: 'config',
});

// When using .decorate you have to specify added properties for Typescript
declare module 'fastify' {
  export interface FastifyInstance {
    config: AppConfig;
  }
}

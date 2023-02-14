import process from 'node:process';
import fp from 'fastify-plugin'

export interface AppConfig {
  publicKey: string;
  secretKey: string;
  webhookSecret: string;
  webAppHost: string;
  apiUrl: string;
}

// The use of fastify-plugin is required to be able
// to export the decorators to the outer scope
export default fp(async (fastify, opts) => {
  const config: AppConfig = {
    publicKey: process.env.STRIPE_PUBLIC_KEY || '',
    secretKey: process.env.STRIPE_SECRET_KEY || '',
    webhookSecret: process.env.STRIPE_WEBHOOK_SECRET || '',
    webAppHost: process.env.WEB_APP_HOST || 'localhost:4280',
    apiUrl: process.env.API_URL || 'http://localhost:7071'
  };

  if (!config.publicKey || !config.secretKey || !config.webhookSecret) {
    throw new Error('Stripe keys are missing');
  }

  fastify.decorate('config', config);
});

// When using .decorate you have to specify added properties for Typescript
declare module 'fastify' {
  export interface FastifyInstance {
    config: AppConfig;
  }
}

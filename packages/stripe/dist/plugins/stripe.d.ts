import Stripe from 'stripe';
declare const _default: import("fastify").FastifyPluginAsync<import("fastify").FastifyPluginOptions, import("fastify").RawServerDefault, import("fastify").FastifyTypeProviderDefault, import("fastify").FastifyBaseLogger>;
export default _default;
declare module 'fastify' {
    interface FastifyInstance {
        stripe: Stripe;
    }
}

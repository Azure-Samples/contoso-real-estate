import fp from 'fastify-plugin';
import Stripe from 'stripe';
export default fp(async (fastify, opts) => {
    const config = fastify.config;
    fastify.decorate('stripe', new Stripe(config.secretKey, { apiVersion: '2022-11-15' }));
}, {
    name: 'stripe',
    dependencies: ['config'],
});
//# sourceMappingURL=stripe.js.map
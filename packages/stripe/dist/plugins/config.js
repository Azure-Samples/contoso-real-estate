import process from 'node:process';
import fp from 'fastify-plugin';
export default fp(async (fastify, opts) => {
    const config = {
        publicKey: process.env.STRIPE_PUBLIC_KEY || '',
        secretKey: process.env.STRIPE_SECRET_KEY || '',
        webhookSecret: process.env.STRIPE_WEBHOOK_SECRET || '',
        webAppUrl: process.env.WEB_APP_URL || 'http://localhost:4280',
        apiUrl: process.env.API_URL || 'http://localhost:7071'
    };
    if (!config.publicKey || !config.secretKey || !config.webhookSecret) {
        throw new Error('Stripe keys are missing');
    }
    fastify.decorate('config', config);
}, {
    name: 'config',
});
//# sourceMappingURL=config.js.map
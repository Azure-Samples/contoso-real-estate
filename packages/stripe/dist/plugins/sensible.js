import fp from 'fastify-plugin';
import sensible from '@fastify/sensible';
export default fp(async (fastify) => {
    fastify.register(sensible);
});
//# sourceMappingURL=sensible.js.map
const root = async (fastify, opts) => {
    fastify.get('/', async function (request, reply) {
        return { root: true };
    });
};
export default root;
//# sourceMappingURL=root.js.map
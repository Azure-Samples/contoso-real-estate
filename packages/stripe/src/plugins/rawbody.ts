import fp from 'fastify-plugin'
import rawbody, { RawBodyPluginOptions } from 'fastify-raw-body';

export default fp<RawBodyPluginOptions>(async (fastify) => {
  fastify.register(rawbody, {
    field: 'rawBody',
    global: false,
    encoding: false,
    runFirst: true
  });
});

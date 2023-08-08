import fp from 'fastify-plugin';

// The use of fastify-plugin is required to be able
// to export the decorators to the outer scope
export default fp(async (fastify, opts) => {

  // TODO: Implement cache with Redis if available

  fastify.decorate('cache', new Cache());
}, {
  name: 'cache'
});

// When using .decorate you have to specify added properties for Typescript
declare module 'fastify' {
  export interface FastifyInstance {
    cache: Cache;
  }
}

// TODO: create interface for cache
export class Cache {
  static GlobalTtl = 60 * 60 * 1000; // 1 hour
  static SuggestionTtl = 10 * 60 * 1000; // 10 minutes

  private cache: Map<string, any> = new Map();

  get(key: string) {
    return this.cache.get(key);
  }

  set(key: string, value: any, ttl = Cache.GlobalTtl) {
    this.cache.set(key, value);
  }

  delete(key: string) {
    this.cache.delete(key);
  }

  exists(key: string) {
    return this.cache.has(key);
  }
}

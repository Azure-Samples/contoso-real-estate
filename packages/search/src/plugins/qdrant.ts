import fp from 'fastify-plugin';
import { QdrantClient } from '@qdrant/js-client-rest';
import { components } from '@qdrant/js-client-rest/dist/types/openapi/generated_schema';

const qdCollection = 'moaw';
const qdDimension = 1536;
const qdMetric = 'Dot';

// The use of fastify-plugin is required to be able
// to export the decorators to the outer scope
export default fp(async (fastify, opts) => {
  const config = fastify.config;

  fastify.log.info(`Using Qdrant at ${config.qdHost}:${config.qdPort}`);

  const qdrant = new QdrantClient({
    host: config.qdHost,
    port: Number(config.qdPort)
  });

  // Ensure collection exists
  try {
    await qdrant.getCollection(qdCollection);
  } catch (_error: unknown) {
    const error = _error as Error;
    if (error.message === 'Collection not found') {
      fastify.log.info(`Creating Qdrant collection ${qdCollection}`);
      await qdrant.createCollection(qdCollection, {
        vectors: {
          size: qdDimension,
          distance: qdMetric,
        }
      });
    } else {
      throw error;
    }
  }

  fastify.decorate('qdrant', new Qdrant(qdrant));
}, {
  name: 'qdrant',
  dependencies: ['config'],
});

// When using .decorate you have to specify added properties for Typescript
declare module 'fastify' {
  export interface FastifyInstance {
    qdrant: Qdrant;
  }
}

export class Qdrant {
  constructor(private readonly qdrant: QdrantClient) {
  }

  async search(vector: components["schemas"]["NamedVectorStruct"], limit: number) {
    return this.qdrant.search(qdCollection, {
      vector,
      limit,
      params: {
        hnsw_ef: 128,
        exact: false,
      }
    });
  }

  async count() {
    const result = await this.qdrant.count(qdCollection, { exact: false });
    return result.count;
  }

  async retrieve(ids: string[]) {
    return this.qdrant.retrieve(qdCollection, { ids });
  }

  async upsert(batch: components["schemas"]["Batch"]) {
    return this.qdrant.upsert(qdCollection, { batch });
  }
}

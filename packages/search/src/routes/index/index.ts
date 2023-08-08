import { FastifyPluginAsync, FastifyRequest } from "fastify";
import { Metadata } from "../../models/metadata";
import { sanitizeForEmbedding } from "../../lib/util.js";

export type IndexRequest = FastifyRequest<{
  Querystring: { 
    user: string;
    force: boolean;
  }
}>;

const index: FastifyPluginAsync = async (fastify, opts): Promise<void> => {
  async function indexer(user: string, force: boolean) {

    const response = await fetch("https://microsoft.github.io/moaw/workshops.json");
    const workshops = await response.json();
  
    const ids = [];
    const payloads = [];
    const vectors = [];
  
    for (const workshop of workshops) {
      const { id } = workshop;
      const metadata = {
        audience: workshop.audience,
        authors: workshop.authors,
        description: workshop.description,
        language: workshop.language,
        last_updated: new Date(workshop.lastUpdated).toUTCString(),
        tags: workshop.tags,
        title: workshop.title,
        url: workshop.url,
      };

      if (!force) {
        const response = await fastify.qdrant.retrieve([id]);
        if (response.length > 0) {
          const stored = response[0].payload as Metadata;
          if (stored.last_updated === metadata.last_updated) {
            fastify.log.info(`Workshop "${metadata.title}" already indexed`);
            continue;
          }
        }
      }

      fastify.log.info(`Indexing workshop "${metadata.title}"`);
      try {
        const text = await createEmbeddingTextFromMetadata(metadata);
        fastify.log.debug(`Text: ${text}`);
        const vector = await fastify.openai.getVectorFromText(text, user);

        // Create Qdrant payload
        vectors.push(vector);
        ids.push(id);
        payloads.push(metadata);
      } catch (_error: unknown) {
        const error = _error as Error;
        fastify.log.warn(`Failed to index workshop "${metadata.title}": `, error);
      }
    }

    if (ids.length === 0) {
      fastify.log.info("No new workshops to index");
      return;
    }

    // Insert into Qdrant
    await fastify.qdrant.upsert({
      ids,
      payloads,
      vectors,
    });

    fastify.log.info(`Indexed ${ids.length} workshops`);
  }

  const indexSchema = {
    schema: {
      querystring: {
        user: { type: 'string' },
        force: { type: 'boolean' },
      },
    },
  };
  fastify.get('/', indexSchema, async function (request: IndexRequest, reply) {
    const { user, force } = request.query;
    indexer(user, force);
    reply.code(202).send('Indexing started');
  });
}

export default index;

async function getWorkshop(url: string) {
  let returnUrl = url;

  if (!url.startsWith("http")) {
    url = `https://microsoft.github.io/moaw/workshops/${url}workshop.md`;
    returnUrl = `https://microsoft.github.io/moaw/workshop/${url}`;
  }

  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Failed to fetch workshop from ${url}`);
  }
  const text = await response.text();
  return [text, returnUrl];
}

async function createEmbeddingTextFromMetadata(metadata: Metadata) {
  const description = sanitizeForEmbedding(metadata.description);
  const [content, url] = await getWorkshop(metadata.url);
  const contentText = sanitizeForEmbedding(content).slice(0, 7500);
  
  // Update model with the real URL
  metadata.url = url;

  return `
Title:
${metadata.title}

Description:
${description}

Content:
${contentText}

Tags:
${metadata.tags.join(', ')}

Authors:
${metadata.authors.join(', ')}

Audience:
${metadata.audience.join(', ')}

Last updated:
${metadata.last_updated}
`;
}

import { FastifyPluginAsync, FastifyRequest } from "fastify";
import { Listing } from "../../models/listing";
import { sanitizeForEmbedding } from "../../lib/util.js";

export type IndexRequest = FastifyRequest<{
  Querystring: {
    user: string;
    force: boolean;
  };
}>;

const index: FastifyPluginAsync = async (fastify, opts): Promise<void> => {
  async function indexer(user: string, force: boolean) {
    const { listingsApiUrl } = fastify.config;
    const response = await fetch(listingsApiUrl);
    const listings = (await response.json()) as Listing[];

    const ids: string[] = [];
    const payloads: any[] = [];
    const vectors: number[][] = [];

    for (const rawListing of listings) {
      const { id } = rawListing;
      const listing = {
        id,
        title: rawListing.title,
        slug: rawListing.slug,
        description: rawListing.description,
        bedrooms: rawListing.bedrooms,
        bathrooms: rawListing.bathrooms,
        type: rawListing.type,
        isFeatured: rawListing.isFeatured,
        isRecommended: rawListing.isRecommended,
        capacity: rawListing.capacity,
        ammenities: rawListing.ammenities,
        reviews_stars: rawListing.reviews_stars,
        reviews_number: rawListing.reviews_number,
        createdAt: new Date(rawListing.createdAt).toUTCString(),
        address: rawListing.address,
        fees: rawListing.fees,
        photos: rawListing.photos,
      };

      if (!force) {
        const response = await fastify.qdrant.retrieve([id]);
        if (response.length > 0) {
          const stored = response[0].payload as Listing;
          if (stored.createdAt === listing.createdAt) {
            fastify.log.info(`Listing "${listing.title}" already indexed`);
            continue;
          }
        }
      }

      fastify.log.info(`Indexing listing "${listing.title}"`);
      try {
        const text = await createEmbeddingTextFromListing(listing);
        fastify.log.debug(`Text: ${text}`);
        const vector = await fastify.openai.getVectorFromText(text, user);

        // Create Qdrant payload
        vectors.push(vector);
        ids.push(id);
        payloads.push(listing);
      } catch (_error: unknown) {
        const error = _error as Error;
        fastify.log.warn(`Failed to index listing "${listing.title}": `, error);
      }
    }

    if (ids.length === 0) {
      fastify.log.info("No new listings to index");
      return;
    }

    // Insert into Qdrant
    await fastify.qdrant.upsert({
      ids,
      payloads,
      vectors,
    });

    fastify.log.info(`Indexed ${ids.length} listings`);
  }

  const indexSchema = {
    schema: {
      querystring: {
        user: { type: "string" },
        force: { type: "boolean" },
      },
    },
  };
  fastify.get("/", indexSchema, async function (request: IndexRequest, reply) {
    const { user, force } = request.query;
    indexer(user, force);
    reply.code(202).send("Indexing started");
  });
};

export default index;

async function createEmbeddingTextFromListing(listing: Listing) {
  const description = sanitizeForEmbedding(listing.description);
  return `

Title:
${listing.title}

Description:
${description}

Type:
${listing.type}

Capacity:
${listing.capacity}

Bathrooms:
${listing.bathrooms}

Bedrooms:
${listing.bedrooms}

Ammenities:
${listing.ammenities}

Fees:
${listing.fees}

Address:
${listing.address}

Is featured:
${listing.isFeatured}

Is recommended:
${listing.isRecommended}

Reviews stars:
${listing.reviews_stars}

Reviews number:
${listing.reviews_number}

Created at:
${listing.createdAt}

SLUG:
${listing.slug}
`;
}

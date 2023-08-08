import { FastifyPluginAsync, FastifyRequest } from "fastify";
import { v4 as uuidv4 } from "uuid";
import { createTokenCacheKey } from "../../lib/util.js";
import { Cache } from "../../plugins/cache.js";
import { SearchAnswer, SearchResult } from "../../models/search.js";
import { Listing } from "../../models/listing.js";

export type SearchRequest = FastifyRequest<{
  Querystring: {
    query: string;
    limit: number;
    user: string;
  };
}>;

const search: FastifyPluginAsync = async (fastify, opts): Promise<void> => {
  async function searchAnswer(query: string, limit: number, user: string) {
    const prompt = `Today, we are the ${new Date().toISOString()}.

QUERY START
${query}
QUERY END`;
    const vector = await fastify.openai.getVectorFromText(prompt, user);

    if (!vector.length) {
      return [];
    }

    const results = await fastify.qdrant.search(vector, limit);
    fastify.log.info(`Found ${results.length} search results`);

    return results;
  }

  const searchSchema = {
    schema: {
      querystring: {
        query: { type: "string" },
        limit: { type: "number", default: 10 },
        user: { type: "string" },
      },
    },
  };
  fastify.get("/", searchSchema, async function (request: SearchRequest, reply) {
    const { query, limit, user } = request.query;
    const start = Date.now();
    request.log.info(`Search for text: ${JSON.stringify(request.query)}`);

    const searchCacheKey = `search:${query}-${limit}`;
    const cachedResults = fastify.cache.get(searchCacheKey);

    if (cachedResults) {
      request.log.info(`Found cached results for query: ${query}`);
      return cachedResults;
    } else {
      request.log.info(`No cached results for query: ${query}`);

      // TODO: add query check with Azure content safety

      const total = await fastify.qdrant.count();
      const results = await searchAnswer(query, limit, user);
      const answers: SearchAnswer[] = [];
      for (const result of results) {
        answers.push({
          id: String(result.id),
          listing: result.payload as Listing,
          score: result.score,
        });
      }

      const searchResult: SearchResult = {
        answers,
        query,
        stats: {
          time: Date.now() - start,
          total,
        },
        suggestionToken: uuidv4(),
      };
      const tokenKey = createTokenCacheKey(searchResult.suggestionToken);

      fastify.cache.set(searchCacheKey, searchResult);
      fastify.cache.set(tokenKey, searchResult, Cache.SuggestionTtl);
      request.log.info(`Search took ${searchResult.stats.time}ms`);

      return searchResult;
    }
  });
};

export default search;

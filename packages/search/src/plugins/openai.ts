import { FastifyBaseLogger } from "fastify";
import fp from "fastify-plugin";
import { ChatCompletionRequestMessage, Configuration, OpenAIApi } from "openai";
import { AppConfig } from "./config.js";
import { anonymizeString, retry } from "../lib/util.js";

export type CompletionMessages = Array<ChatCompletionRequestMessage>;

// The use of fastify-plugin is required to be able
// to export the decorators to the outer scope
export default fp(
  async (fastify, opts) => {
    const config = fastify.config;

    fastify.log.info(`Using OpenAI at ${config.openaiApiUrl}`);

    const commonConfigurationOptions = {
      apiKey: config.openaiApiKey,
      baseOptions: {
        headers: { "api-key": config.openaiApiKey },
        params: {
          "api-version": "2023-05-15",
        },
      },
    };

    const completionConfiguration = new Configuration({
      ...commonConfigurationOptions,
      basePath: `${config.openaiApiUrl}/openai/deployments/${config.openaiGptId}`,
    });
    const completion = new OpenAIApi(completionConfiguration);

    const embeddingsConfiguration = new Configuration({
      ...commonConfigurationOptions,
      basePath: `${config.openaiApiUrl}/openai/deployments/${config.openaiAdaId}`,
    });
    const embeddings = new OpenAIApi(embeddingsConfiguration);

    fastify.decorate("openai", new OpenAI(completion, embeddings, config, fastify.log));
  },
  {
    name: "openai",
    dependencies: ["config"],
  },
);

// When using .decorate you have to specify added properties for Typescript
declare module "fastify" {
  export interface FastifyInstance {
    openai: OpenAI;
  }
}

export class OpenAI {
  constructor(
    public readonly completion: OpenAIApi,
    public readonly embeddings: OpenAIApi,
    readonly config: AppConfig,
    private readonly logger: FastifyBaseLogger,
  ) {}

  async getVectorFromText(prompt: string, user: string, signal?: AbortSignal): Promise<number[]> {
    const anonymizedUser = anonymizeString(user);

    try {
      const response = await retry(
        async () =>
          this.embeddings.createEmbedding(
            {
              model: "text-embedding-ada-002",
              input: prompt,
              user: anonymizedUser,
            },
            { signal },
          ),
        3,
      );
      return response.data.data[0].embedding;
    } catch (_error: unknown) {
      const error = _error as Error;
      this.logger.error(`OpenAI embeddings error: ${error.message}`);
      return [];
    }
  }

  async getChatCompletion(messages: CompletionMessages, user: string, signal?: AbortSignal): Promise<string> {
    const anonymizedUser = anonymizeString(user);

    try {
      // TODO: support streaming (not available in v3)
      const response = await retry(
        async () =>
          this.completion.createChatCompletion(
            {
              model: "gpt-35-turbo",
              messages,
              presence_penalty: 1, // Increase likelihood to talk about new topics
              stream: false,
              user: anonymizedUser,
            },
            { signal },
          ),
        3,
      );

      const content = response.data?.choices[0].message?.content;
      if (content) {
        this.logger.debug(`Completion result: ${content}`);
        return content;
      }
    } catch (_error: unknown) {
      const error = _error as Error;
      this.logger.error(`OpenAI completion error: ${error.message}`);
    }
    return "";
  }
}

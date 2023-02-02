export interface AppConfig {
    publicKey: string;
    secretKey: string;
    webhookSecret: string;
    webAppUrl: string;
    apiUrl: string;
}
declare const _default: import("fastify").FastifyPluginAsync<import("fastify").FastifyPluginOptions, import("fastify").RawServerDefault, import("fastify").FastifyTypeProviderDefault, import("fastify").FastifyBaseLogger>;
export default _default;
declare module 'fastify' {
    interface FastifyInstance {
        config: AppConfig;
    }
}

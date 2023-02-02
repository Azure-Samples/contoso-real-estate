import { AutoloadPluginOptions } from '@fastify/autoload';
import { FastifyPluginAsync } from 'fastify';
export declare type AppOptions = {} & Partial<AutoloadPluginOptions>;
declare const options: AppOptions;
declare const app: FastifyPluginAsync<AppOptions>;
export default app;
export { app, options };

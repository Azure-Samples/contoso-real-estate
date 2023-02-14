import fp from 'fastify-plugin'
import fetch, { Response, RequestInit } from 'node-fetch';
import { AppConfig } from './config';

// The use of fastify-plugin is required to be able
// to export the decorators to the outer scope
export default fp(async (fastify, opts) => {
  const config = fastify.config;
  fastify.decorate('api', new ApiService(config));
});

export class HttpError extends Error {
  constructor(public response: Response, message?: string) {
    super(message);
  }
}

export class ApiService {
  private baseUrl: string;

  constructor(config: AppConfig) { 
    this.baseUrl = `${config.apiUrl}/api`;
  }

  


  private async fetch(url: string, options?: RequestInit) {
    const response = await fetch(url, options);
    if (!response.ok) {
      throw new HttpError(response, `Failed to fetch ${url}`);
    }
    return response.json();
  }
}

// When using .decorate you have to specify added properties for Typescript
declare module 'fastify' {
  export interface FastifyInstance {
    api: ApiService;
  }
}

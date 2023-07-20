/**
 * file: packages/api-v4/src/middleware.ts
 * description: file responsible for the middleware of the api functions (v4)
 * data: 07/19/2023
 * author: Glaucia Lemos
 */

import type { HttpHandler } from "@azure/functions";

type HttpHandlerMiddleware = (handler: HttpHandler) => HttpHandler;

export const applyMiddleware: (handler: HttpHandler, ...middlewares: HttpHandlerMiddleware[]) => HttpHandler = (handler, ...middlewares) => middlewares.reduceRight((handler, middleware) => middleware(handler), handler);

export const offset: HttpHandlerMiddleware = handler => (request, context) => {
  const { query } = request;
  const offset = Number(query.get('offset')) || 0;

  if (offset < 0) {
    return {
      status: 400,
      jsonBody: {
        error: 'Offset must be greater than or equal to 0',
      },
    };
  }

  return handler(request, context);
};

export const limit: HttpHandlerMiddleware = handler => (request, context) => {
  const { query } = request;
  const limit = Number(query.get('limit')) || 10;

  if (limit < 0) {
    return {
      status: 400,
      jsonBody: {
        error: 'Limit must be greater than or equal to 0',
      },
    };
  }

  return handler(request, context);
};

export const offsetLimitRange: HttpHandlerMiddleware = handler => (request, context) => {
  const { query } = request;
  const offset = Number(query.get('offset')) || 0;
  const limit = Number(query.get('limit')) || 10;

  if (offset > limit) {
    return {
      status: 400,
      jsonBody: {
        error: 'Offset must be less than or equal to limit',
      },
    };
  }

  return handler(request, context);
};




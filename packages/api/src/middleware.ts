import type { HttpHandler } from "@azure/functions";

type HttpHandlerMiddleware = (handler: HttpHandler) => HttpHandler;

export const applyMiddleware: (handler: HttpHandler, ...middlewares: HttpHandlerMiddleware[]) => HttpHandler = (
  handler,
  ...middlewares
) => middlewares.reduceRight((handler, middleware) => middleware(handler), handler);

export const offset: HttpHandlerMiddleware = handler => (context, req) => {
  const { query } = req;
  const offset = Number(query.get("offset")) || 0;

  if (offset < 0) {
    return {
      status: 400,
      body: {
        error: "Offset must be greater than or equal to 0",
      },
    };
  }

  return handler(context, req);
};

export const limit: HttpHandlerMiddleware = handler => (context, req) => {
  const { query } = req;
  const limit = Number(query.get("limit")) || 10;

  if (limit < 0) {
    return {
      status: 400,
      body: {
        error: "Limit must be greater than or equal to 0",
      },
    };
  }

  return handler(context, req);
};

export const offsetLimitRange: HttpHandlerMiddleware = handler => (context, req) => {
  const { query } = req;
  const offset = Number(query.get("offset")) || 0;
  const limit = Number(query.get("limit")) || 10;

  if (offset > limit) {
    return {
      status: 400,
      body: {
        error: "Offset must be less than or equal to limit",
      },
    };
  }

  return handler(context, req);
};

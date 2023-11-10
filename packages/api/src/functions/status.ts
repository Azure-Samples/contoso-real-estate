import { HttpRequest, HttpResponseInit, InvocationContext } from "@azure/functions";

type Env = { [key: string]: string | undefined };

function sortObjectByPropertyName(obj: Env): Env {
  const sortedKeys = Object.keys(obj).sort();
  const sortedObj: Env = {};

  for (const key of sortedKeys) {
    sortedObj[key] = obj[key];
  }

  return sortedObj;
}

export async function status(request: HttpRequest, context: InvocationContext): Promise<HttpResponseInit> {
  context.log(`Http function status processed request for url "${request.url}"`);

  const sortedEnv = sortObjectByPropertyName(process.env as Env);

  return {
    status: 200,
    jsonBody: sortedEnv
  };
}

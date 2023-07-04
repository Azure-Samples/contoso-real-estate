import { app, HttpRequest, HttpResponseInit, InvocationContext } from "@azure/functions";

export async function httpTriggerTest(request: HttpRequest, context: InvocationContext): Promise<HttpResponseInit> {
  context.log(`Http function processed request for url "${request.url}"`);

  const name = request.query.get('name') || await request.text() || 'I will be right back!';

  return { body: `Hello, Developers! ${name}!` };

};

app.http('httpTriggerTest', {
  methods: ['GET', 'POST'],
  authLevel: 'anonymous',
  handler: httpTriggerTest
});

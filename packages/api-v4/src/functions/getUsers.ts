import { app, HttpRequest, HttpResponseInit, InvocationContext } from "@azure/functions";

export async function getUsers(request: HttpRequest, context: InvocationContext): Promise<HttpResponseInit> {
    context.log(`Http function processed request for url "${request.url}"`);

    const name = request.query.get('name') || await request.text() || 'Get All Users';

    return { body: `Returning...: ${name}!` };
};

app.http('getUsers', {
    methods: ['GET', 'POST'],
    authLevel: 'anonymous',
    handler: getUsers
});

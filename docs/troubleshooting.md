# Troubleshooting and FAQ

This section helps troubleshoot various issues that you might encounter while installing and setting up the project.

## A service is not starting

After running `npm start`, the following services are started:
- `packages/portal` for the portal frontend
- `packages/api` for the API backend
- `packages/blog` for the blog frontend
- `packages/blog-cms` for the CMS admin UI
- `packages/stripe` for the Stripe webhook handler

Note: The services are started in parallel, so if one of them fails to start, it will not stop the others from starting. If you see an error message in the console, try to fix the issue and restart the service.

The following services are started inside Docker containers:
- `packages/blog-cms` 
- `packages/blog`
- `packages/stripe`

In addition, the following database services are started inside of Docker containers:
- `postgres` for the CMS database
- `mongo` for the Portal application's database

If you believe one of the services is failing to start, first run the following command to see if the service is running:

```bash
docker ps
```

You should see a list of running containers. For instance:

```text
CONTAINER ID   IMAGE                          COMMAND                  CREATED         STATUS                   PORTS                                           NAMES
628f6653a793   contoso-real-estate-blog       "docker-entrypoint.s…"   2 minutes ago   Up 2 minutes             0.0.0.0:3000->3000/tcp, :::3000->3000/tcp       contoso-real-estate-blog-1
47b437dd4a8d   contoso-real-estate-blog-cms   "docker-entrypoint.s…"   2 minutes ago   Up About a minute        0.0.0.0:1337->1337/tcp, :::1337->1337/tcp       contoso-real-estate-blog-cms-1
cbd216af3a3f   postgres:latest                "docker-entrypoint.s…"   2 minutes ago   Up 2 minutes (healthy)   0.0.0.0:5432->5432/tcp, :::5432->5432/tcp       contoso-real-estate-postgres-1
925df36bc5af   contoso-real-estate-stripe     "docker-entrypoint.s…"   18 hours ago    Up 3 minutes             0.0.0.0:4242->4242/tcp, :::4242->4242/tcp       contoso-real-estate-stripe-1
436dc13d0ba1   mongo:5.0                      "docker-entrypoint.s…"   18 hours ago    Up 3 minutes             0.0.0.0:27017->27017/tcp, :::27017->27017/tcp   contoso-real-estate-mongodb-1
```

If one of the service is missing, you can try to restart it using the following command:

```bash
docker-compose up -d <service-name>
```

Note: you can find the service name inside of the [`docker-compose.yml`](https://github.com/Azure-Samples/contoso-real-estate/blob/main/docker-compose.yml) file at the root of the project.

## How the GraphQL search URI is configured

The CMS service provides a search API that is used by the Portal application to search for listings. The search API is implemented using GraphQL. The Portal application uses the Apollo Client library to query the search API. The Apollo Client library is configured to use the URI depending on the following criteria:

1. If the project is running on GitHub Codespaces (remotely or locally in VSCode), the URI is set to `https://${process.env["CODESPACE_NAME"]}-1337.${process.env["GITHUB_CODESPACES_PORT_FORWARDING_DOMAIN"]}/graphql`.
2. If the project is running locally (outside of GitHub Codespaces), the URI is set to `http://localhost:1337/graphql`.
3. If the project has been deployed to Azure, hence running in production, the URI is set from the `SERVICE_CMS_URI` environment variable provided by the Azure Developer CLI (`azd`) during the pre-deployment step (see [`infra/hooks/portal/predeploy.js`](https://github.com/Azure-Samples/contoso-real-estate/blob/main/infra/hooks/portal/predeploy.js)).


## How the Blog URL is configured

The Portal application contains a link that points to the Blog application. The URL of the Blog application is configured depending on the following criteria:

1. If the project is running on GitHub Codespaces (remotely or locally in VSCode), the URL is set to `https://${process.env["CODESPACE_NAME"]}-3000.${process.env["GITHUB_CODESPACES_PORT_FORWARDING_DOMAIN"]}`.
2. If the project is running locally (outside of GitHub Codespaces), the URL is set to `http://localhost:3000`.
3. If the project has been deployed to Azure, hence running in production, the URL is set from the `SERVICE_BLOG_URI` environment variable provided by the Azure Developer CLI (`azd`) during the pre-deployment step (see [`infra/hooks/portal/predeploy.js`](https://github.com/Azure-Samples/contoso-real-estate/blob/main/infra/hooks/portal/predeploy.js)).

## The search functionalities are not working in the Portal application

In order to investigate the issue, you can open the browser's developer tools and look at the network requests. You should see a request to the GraphQL search API:

```text
POST https://CODESPACE_NAME-1337.app.github.dev/graphql
```

If the request fails, you can look at the response to see if there is an error message. If the issue is related to CORS (or error code 401):

```text
Access to XMLHttpRequest at 'https://CODESPACE_NAME-1337.app.github.dev/graphql' from origin 'https://CODESPACE_NAME-4280.app.github.dev' has been blocked by CORS policy: No 'Access-Control-Allow-Origin' header is present on the requested resource.
```

You will need to change the CMS service port from `Private` to `Public` by following these steps:

1. Open the **PORTS** tab in GitHub Codespaces.
2. Right-click on the **Strapi CMS (1337)** service and select **Port Visibility**, then select **Public**.
3. The port visibility should now be set to **Public**.

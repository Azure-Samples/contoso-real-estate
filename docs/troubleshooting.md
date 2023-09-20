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

Note: you can find the service name inside of the `docker-compose.yml` file at the root of the project.


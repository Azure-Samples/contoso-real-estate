---
title: Dev Environment
---

## Project Structure

Within the `packages` folder, you will find the two projects that make up this scenario:

- `blog-cms` - The Strapi CMS
- `blog` - The Next.js frontend

## Local Development

:::tip GUIDANCE
This scenario has been optimised for use with [VS Code Remote Containers](https://code.visualstudio.com/docs/remote/containers), and contains definitions to setup the PostgreSQL database that Strapi uses, and this guide makes the assumption that you will use the dev container.
:::

### Starting Strapi

Strapi requires environment variables to provide the various JWT secrets. A sample of the `.env` file can be found at `packages/blog-cms/.env.example`. Copy this file to `packages/blog-cms/.env` and update the values to match your environment.

:::info
You don't need to set the PostgreSQL environment variables, as these are set in the dev container definition.
:::

To start the Strapi CMS, run the following command:

```bash
npm run develop --workspace blog-cms
```

Strapi will then be running at [`http://localhost:1337/admin`](http://localhost:1337/admin).

:::note
On first run, sample data will be loaded into the database, but you will need to setup an admin user, following the guide on the admin portal.
:::

### Starting Next.js

To start the Next.js application, run the following command:

```bash
npm run dev --workspace blog
```

The Next.js application will then be running at [`http://localhost:3000`](http://localhost:3000).

:::note
The Next.js application will call the Strapi API at http://localhost:1337, so you will need to ensure that Strapi is running before starting the Next.js application.
:::

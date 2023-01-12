This document will guide you through the prerequisites and commands necessary to setup and preview the portal project, locally on your computer.

## Prerequisites

- [VS Code](https://code.visualstudio.com/)
  - You can use any other editor of choice but this guide will assume you are using VS Code
- [VS Code Dev Containers](https://code.visualstudio.com/docs/remote/containers)
  - This will allow you to run the project in a containerized environment

## Project Structure

Within the `packages` folder, you will find the two projects that make up this scenario:

- `blog-cms` - The Strapi CMS
- `blog` - The Next.js frontend

## Local Development

_Note: This scenario has been optimised for use with [VS Code Remote Containers](https://code.visualstudio.com/docs/remote/containers), and contains definitions to setup the PostgreSQL database that Strapi uses, and this guide makes the assumption that you will use the dev container._

### Starting Strapi

Strapi requires environment variables to provide the various JWT secrets. A sample of the `.env` file can be found at `packages/blog-cms/.env.example`. Copy this file to `packages/blog-cms/.env` and update the values to match your environment.

_Note: You don't need to set the PostgreSQL environment variables, as these are set in the dev container definition._

To start the Strapi CMS, run the following command:

```bash
npm run develop --workspace blog-cms
```

Strapi will then be running at [`http://localhost:1337/admin`](http://localhost:1337/admin).

_Note: On first run, sample data will be loaded into the database, but you will need to setup an admin user, following the guide on the admin portal._

### Starting Next.js

To start the Next.js application, run the following command:

```bash
npm run dev --workspace blog
```

The Next.js application will then be running at [`http://localhost:3000`](http://localhost:3000).

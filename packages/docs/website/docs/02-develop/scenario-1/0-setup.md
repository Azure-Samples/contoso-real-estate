---
title: Setup
---

This document will guide you through the prerequisites and commands necessary to setup and preview the blog-cms project, locally on your computer.

## Pre-requisites

- [VS Code](https://code.visualstudio.com/)
- You can use any other editor of choice but this guide will assume you are using VS Code
- [VS Code Dev Containers](https://code.visualstudio.com/docs/remote/containers)
  This will allow you to run the project in a containerized environment

## Steps to start the blog

1. Fork or clone the repository locally
2. Open the project in VS Code and wait for the container to be built and started
3. Open the terminal and run `npm install`

> Because this is an npm workspaces format repository, you will be installing dependencies for all scenarios, but you don't need to start all development servers.

4. Start the [Strapi](https://strapi.io/) CMS by running the following command:

```bash
npm run develop --workspace blog-cms
```

5. Start the [Next.js](https://nextjs.org/) application by running the following command:

```bash
npm run dev --workspace blog
```

You can navigate to the Strapi instance at [`http://localhost:1337/admin`](http://localhost:1337/admin) and the Next.js application at [`http://localhost:3000`](http://localhost:3000).

> The Strapi instance will have been bootstrapped with some sample content, but you will need to setup a user account to access the admin panel. Navigating to the admin portal for the first time will prompt you to create an account.

# Entreprise-grade Reference Architecture for JavaScript

This repository contains the reference architecture and components for building an entreprise-grade moderne modern composable frontends (or micro-frontends) and cloud-native applications. It is a collection of best practices, architure patterns, and components that can be used to build and deploy modern JavaScript applications to Azure.

## Table of Contents

You can navigate through the documentation using the table of contents below:

- [Architecture Diagram](#architecture-diagram)
- [Components](#components)
  - [Frontend](#frontend)
  - [Backend](#backend)
  - [DevOps](#devops)
  - [Developer tools](#developer-tools)
- [Development environment](#development-environment)
- [Deploy to Azure](#deploy-to-azure)
- [Project structure](#project-structure)

## Architecture Diagram

<p align="center">
  <img src="assets/diagrams/e2e-full-horizontal.drawio.png" width="100%" alt="Application architecture diagram"/>
</p>

## Simplified Flow Diagram

```mermaid
flowchart TD
    %% 

    subgraph Internet
    Portal[https://portal.contoso.com]
    Blog[https://blog.contoso.com]
    CMS[https://cms.contoso.com]
    Stripe[https://stripe.contoso.com]
    API[https://api.contoso.com]
    end
    
    subgraph Azure API Management
    APIM(API Gateway)
    end
    
    subgraph Azure Static Web Apps
    SWA_Angular([Angular])
    end 

    subgraph Azure Functions
    Functions([Node.js])
    end 

    subgraph Azure Container Apps
    ACA_Next([Next.js])
    ACA_Strapi([Strapi])
    ACA_Stripe([Stripe])
    end 

    subgraph Database/Storage
    DB_PostresSQL[(PostgreSQL - Strapi)]
    DB_Mongo[(MongoDB - Portal)]
    Storage([Azure Blob Storage - CMS])
    end 

    Portal --> SWA_Angular -- "portal.contoso.com/api/**" --> APIM -- "portal.contoso.com/api/**" --> Functions
    
    Blog -- "blog.contoso.com" --> ACA_Next -. "Strapi API" .-> ACA_Strapi
    
    CMS -- "cms.contoso.com" --> ACA_Strapi
    ACA_Strapi -- "read/write" ----> DB_PostresSQL -- "read only" --> Functions
    ACA_Strapi -- "upload" --> Storage
    
    API --> APIM -- "api.contoso.com" --> Functions <-- "read/write" --> DB_Mongo

    Stripe ---> APIM -- "stripe.contoso.com" --> ACA_Stripe <-. "validate paiement (through APIM)" .-> Functions
    
    %% Portal
    linkStyle 0 stroke:pink
    linkStyle 1 stroke:pink
    linkStyle 2 stroke:pink

    %% Blog
    linkStyle 3 stroke:blue
    linkStyle 4 stroke:blue
    linkStyle 5 stroke:blue
    
    %% CMS
    linkStyle 5 stroke:red
    linkStyle 6 stroke:red
    linkStyle 8 stroke:red
    
    linkStyle 7 stroke:lime
    linkStyle 9 stroke:lime
    linkStyle 10 stroke:lime
    linkStyle 11 stroke:lime
```

## Components

### Frontend

- [Angular](https://angular.io/) - The Portal application used to view and book listings.
- [Next.js](https://nextjs.org/) - The Blog application used to view and create blog posts.
- [Playwright](https://playwright.dev/) - The end-to-end testing of the Portal application.
- [Azure Static Web Apps](https://azure.microsoft.com/services/app-service/static/) - The hosting of the Portal application.

### Backend

- [Strapi](https://strapi.io/) - The CMS application used to manage the data for the Portal and Blog applications.
- [Stripe](https://stripe.com/) - The payment processing.
- [Fastify](https://www.fastify.io/) - The API used that interfaces with the Stripe API and Portal application.
- [Azure Functions](https://azure.microsoft.com/services/functions/) - The API used to communicate with Portal application.
- [MongoDB for Azure Cosmos DB](https://azure.microsoft.com/services/cosmos-db/) - The database used to store the data for the Portal application.
- [Azure Database for PostgreSQL](https://azure.microsoft.com/services/postgresql/) - The database used to store the data for the CMS application.
- [Azure Storage](https://azure.microsoft.com/services/storage/) - The storage used to store the data for the CMS and Blog application.
- [Azure Container Apps](https://azure.microsoft.com/services/container-apps/) - The hosting of the Blog, Stripe and Strapi APIs.
- [Azure Application Insights](https://azure.microsoft.com/services/monitor/) - Monitoring and accessing logs for the applications and APIs.

### DevOps

- [Azure CLI](https://learn.microsoft.com/cli/azure/install-azure-cli) - Provisioning, managing and deploying the application to Azure.
- [Azure Dev CLI](https://learn.microsoft.com/azure/developer/azure-developer-cli/install-azd) - Accelerating the process of building cloud apps on Azure.
- [GitHub Actions](https://github.com/features/actions) - The CI/CD pipelines.

### Developer tools

- [Visual Studio Code](https://code.visualstudio.com/) - The local IDE experience.
- [GitHub Codespaces](https://github.com/features/codespaces) - The cloud IDE experience.
- [Azure Static Web Apps CLI](https://azure.github.io/static-web-apps-cli/) - The local development experience.

## Development environment

This project is optimized for use with [GitHub Codespaces](https://github.com/features/codespaces). Here is how to get started:

1. Fork this repository.
1. Create a new GitHub Codespace from your fork. This will automatically provision a new Codespace with all the required dependencies preinstalled and configured.
1. Open the terminal and run `npm start` to start the development servers.
  *Note: Codespaces will show a series of windows on the right side of the screen while starting all servers. This is normal and expected.*
1. Once all dev servers have started, the following URLs will be available:

| Application    | URL                                                      | Port |
| -------------- | -------------------------------------------------------- | ---- |
| Portal         | https://YOUR-REPO-4280.preview.app.github.dev:4280       | 4280 |
| Blog           | https://YOUR-REPO-3000.preview.app.github.dev:3000       | 3000 |
| Strapi CMS     | https://YOUR-REPO-1337.preview.app.github.dev:1337/admin | 1337 |
| Serverless API | https://YOUR-REPO-7071.preview.app.github.dev:7071/api/  | 7071 |
| Stripe API     | https://YOUR-REPO-4242.preview.app.github.dev:4242       | 4242 |

> _Note: The URLs above are just examples. The URLs will be different for your fork. The ports however will be the same._

## Project structure

The project is using `npm` workspaces. The project structure is as follows:

- `packages/` - contains all the packages
  - [`api`](../packages/api/) - contains the serverless Azure Functions API.
  - [`portal`](../packages/portal) - contains the Angular web portal.
  - [`blog`](../packages/blog) - contains the Next.js blog.
  - [`blog-cms`](../packages/blog-cms) - contains the Strapi CMS.
  - [`stripe`](../packages/stripe) - contains the Stripe webhook.
  - [`testing`](../packages/testing) - contains the Playwright tests.

## Deploy to Azure

### Prerequisites

This project uses [GitHub Codespaces](https://github.com/features/codespaces) as the main development environment. The following steps assume you are using GitHub Codespaces. If you are not using GitHub Codespaces, you can open the project in a Dev Container locally following the instructions [here](docs/dev-container.md).

### Deploy to Azure

This project uses Azure Dev CLI to provision, manage and deploy the application to Azure. Runing the following command will get you started with the deployment. This command will create an `azd` developement environment, provision the Azure resources, and deploy the application to Azure.

Here is how to deploy the application to Azure:

```bash
azd up
```

_Note: if asked to login to Azure, please use the following command to login to Azure:_

```bash
azd login
```
### Clean up resources

When you are done, you can delete all the Azure resources created with this template by running the following command:

```bash
azd down
```

## Want to help?

Want to file a bug, contribute some code, or improve the documentation? Excellent! Read up on our guidelines for [contributing](./CONTRIBUTING.md) and then check out one of our issues in the list: [community-help](https://github.com/Azure-Samples/contoso-real-estate/issues).

import Architecture from "./2-architecture.svg"

## title: Architecture

:::tip GUIDANCE

1. This architecture shows how to implement ...
2. Include an architecture diagram
3. The list of Azure resources includes ...
4. The list of tools to implement this scenario includes ...
5. The cloud planes involved (and how):
   - Management plane
   - Control plane
   - Data plane
6. Some SDKs combine control and data plane together. If you know the scenario uses an SDK that does this, please state that.
   :::

This architecture shows how to implement the `Real Estate Portal App`, consisting of the following components:

- a frontend application
- a database
- a serverless function for the API

For this particular implementation of the solution we are using

- [Angular](https://angular.io/) for the frontend client-side application

and the following Azure services

- [Azure Static Web Apps](https://azure.microsoft.com/es-es/products/app-service/static/#features), including capabilities like
  - Managed API (Managed fully integrated Azure Function)
- [Cosmos DB for PostgreSQL API] (https://techcommunity.microsoft.com/t5/microsoft-mechanics-blog/azure-cosmos-db-for-postgresql-how-it-works/ba-p/3648760)
- [Azure Key-Vault](https://azure.microsoft.com/en-us/pricing/details/key-vault/) to store our secrets - _this service's lowest tier is standard and implies a cost. You may use environment variables to test the application_

## Pricing: current solution

This scenario solution attempts at featuring Try and Free tiers, for experimentation and learning. The totals approaximate costs, come determined by the following table:

TODO: Add pricing table

Additionally we use

- [GitHub](https://github.com/) to host and manage our code-base

## Architecture Diagram

<Architecture />;

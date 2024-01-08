# Contoso Real Estate App: API Package (v4)

**IMPORTANT: THIS REPOSITORY IS OPTIMIZED FOR CODESPACES AND TO WORK AS A SET OF COMPOSABLE APPS AND APIS. STANDALONE PACKAGE FUNCTIONALITY IS LIMITED AND MAY REQUIRE ADDITIONAL CONFIGURATION OR DEVELOPMENT**

This package deploys an Azure Functions API that is used by the Contoso Real Estate App, with multiple endpoints, and serving multiple applications, that are part of the scenarios.

## Pre-requisites

**IMPORTANT: THIS SCENARIO IS TIGHTLY COUPLED WITH SCENARIO 3. SOME PARTS OF THIS FUNCTION APP MAY NOT WORK AS EXPECTED IF YOU DON'T FOLLOW THE INSTRUCTIONS IN SCENARIO 3. THIS FUNCTION APP QUERIES TWO DATABASES. THEY MAY NEED TO BE IN PLACE IN ORDER FOR THE ENDPOINTS TO WORK**

If you want to run the API independently and locally, the following technologies must be in place:

- [node.js](https://nodejs.org) LTS, with the corresponding npm version
- [Azure Core Tools](https://learn.microsoft.com/azure/azure-functions/functions-run-local)

## Instructions for using the API

Azure Functions v4 is the latest version of the Node.js programming model for Azure Functions. It comes with a bunch of new features and improvements, such as:

- Flexible folder structure
- Being able to define function.json directly in the function's in the code
- New HTTP trigger types
- Improved IntelliSense
- Timer Trigger (TypeScript)
- Durable Functions (TypeScript)

## Steps to start the API

1. fork or clone the repository locally
2. assuming you are in the folder containing your clone, go to the terminal and run

```bash
cd packages/api
```

3. create the `local.settings.json` file and add the following block of code:

```json
{
  "IsEncrypted": false,
  "Values": {
    "FUNCTIONS_WORKER_RUNTIME": "node",
    "AzureWebJobsFeatureFlags": "EnableWorkerIndexing"
  }
}
```

4. Now install all the dependencies for the API and run it

```bash
npm install && npm start
```

## Manually testing in dev container

1. Comment out Stripe in `azure.yaml` and `docker-compose.yml`. 

1. Start local services in dev container

  ```bash
  npm run start:services
  ```

1. Rename env file for Azure Functions

  ```bash
  mv ./packages/api/local.settings.sample.json ./packages/api/local.settings.json
  ```

1. In new dev container terminal, Build API

  ```bash
  npm run start:host --workspace=api
  ```

  Output should include APIs such as: 

  ```console
  Azure Functions Core Tools
  Core Tools Version:       4.0.5455 Commit hash: N/A  (64-bit)
  Function Runtime Version: 4.27.5.21554

  [2024-01-04T16:49:20.258Z] Worker process started and initialized.

  Functions:

          delete-favorites: [DELETE] http://localhost:7071/api/favorites

          get-favorites: [GET] http://localhost:7071/api/favorites

          get-listings: [GET] http://localhost:7071/api/listings

          get-listings-by-id: [GET] http://localhost:7071/api/listings/{id}

          get-openapi: [GET] http://localhost:7071/api/{filename?}

          get-payments: [GET] http://localhost:7071/api/payments

          get-payments-by-id: [GET] http://localhost:7071/api/payments/{id}

          get-reservations: [GET] http://localhost:7071/api/reservations

          get-reservations-by-id: [GET] http://localhost:7071/api/reservations/{id}

          get-users: [GET] http://localhost:7071/api/users

          get-users-by-id: [GET] http://localhost:7071/api/users/{id}

          patch-reservations-by-id: [PATCH] http://localhost:7071/api/reservations/{id}

          post-checkout: [POST] http://localhost:7071/api/checkout

          post-favorites: [POST] http://localhost:7071/api/favorites

          post-payment: [POST] http://localhost:7071/api/payments

          post-users: [POST] http://localhost:7071/api/users
  ```

1. In new dev container terminal, use cURL to get all listings from PostgreSQL.

  ```bash
  curl "http://localhost:7071/api/listings" --verbose
  ```

  This proves that the API can successfully talk to PostgreSQL.

1. Use cURL to favorite a listing for a fake user, adding favorite into MongoDB.

  ```bash
  curl -X POST http://localhost:7071/api/favorites -H "Content-Type: application/json" -d '{"listing": {"id": "1"}, "user": {"id": "123"}}' --verbose
  ```

1. Use cURL to get all favorited items for fake user, querying into MongoDB. 

  ```bash
  curl "http://localhost:7071/api/favorites?userId=123" --verbose
  ```

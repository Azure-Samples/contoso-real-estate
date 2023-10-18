# Contoso Real Estate App: API Package (v4)

**IMPORTANT: THIS REPOSITORY IS OPTIMIZED FOR CODESPACES AND TO WORK AS A SET OF COMPOSABLE APPS AND APIS. STANDALONE PACKAGE FUNCTIONALITY IS LIMITED AND MAY REQUIRE ADDITIONAL CONFIGURATION OR DEVELOPMENT**

This package deploys an Azure Functions API that is used by the Contoso Real Estate App, with multiple endpoints, and serving multiple applications, that are part of the scenarios.

## Pre-requisites

**IMPORTANT: THIS SCENARIO IS TIGHTLY COUPLED WITH SCENARIO 3. SOME PARTS OF THIS FUNCTION APP MAY NOT WORK AS EXPECTED IF YOU DON'T FOLLOW THE INSTRUCTIONS IN SCENARIO 3. THIS FUNCTION APP QUERIES TWO DATABASES. THEY MAY NEED TO BE IN PLACE IN ORDER FOR THE ENDPOINTS TO WORK**

If you want to run the API independently and locally, the following technologies must be in place:

- [node.js](https://nodejs.org) LTS, with the corresponding npm version
- [Azure Core Tools](https://learn.microsoft.com/azure/azure-functions/functions-run-local)

## Instructions for using the API-V4

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
cd packages/api-v4
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

# Contoso Real Estate App: Portal Package

**IMPORTANT: THIS REPOSITORY IS OPTIMIZED FOR CODESPACES AND TO WORK AS A SET OF COMPOSABLE APPS AND APIS. STANDALONE PACKAGE FUNCTIONALITY IS LIMITED AND MAY REQUIRE ADDITIONAL CONFIGURATION OR DEVELOPMENT**

This document will guide you through the prerequisites and commands necessary to setup and preview the portal project, locally on your computer. This document will guide you through the prerequisites and commands necessary to setup and preview the portal project, locally on your computer. 

It will also instruct you how to deploy it to [Azure Static Web Apps](https://learn.microsoft.com/azure/static-web-apps/overview), to publish it to the cloud, independently, using the [Azure Static Web Apps CLI](https://azure.github.io/static-web-apps-cli/).

## Prerequisites

**IMPORTANT: THIS SCENARIO IS TIGHTLY COUPLED WITH SCENARIO 3. SOME PARTS OF THIS APP MAY NOT WORK AS EXPECTED IF YOU DON'T FOLLOW THE INSTRUCTIONS IN SCENARIO 3.**

In order to start the development server for local development or locally browsing the portal site, the following technologies must be installed in your computer:

- [node.js](https://nodejs.org) **v18.15.0** specifically, with the corresponding npm version
- [Azure Core Tools](https://learn.microsoft.com/azure/azure-functions/functions-run-local)
- [Azure Static Web Apps CLI](https://azure.github.io/static-web-apps-cli/)

### Angular CLI

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 14.2.3.

## Steps to start the portal

1. fork or clone the repository locally
2. assuming you are in the folder containing `contoso-real-estate/packages/portal`, go to the terminal and run 

```bash
npm run clean:install
```
    
at the root level of the repository. This will install all dependencies for all scenarios. 

This operation will also install the [Azure Static Web Apps CLI](https://azure.github.io/static-web-apps-cli/docs/intro). This tool includes a local dev server and emulator, to test the application and the corresponding API together, locally.


3. assuming you are now in the `contoso-real-estate`, go to the terminal and run

```bash
npm start
```

Follow the [Azure Static Web Apps CLI](https://azure.github.io/static-web-apps-cli/docs/cli/swa) prompts to complete the configuration.
    
Your default browser should open a new window with the application running. If you did not pass a port option, it should be running at [http://localhost:4280](http://localhost:4280)


5. Go to `http://localhost:4280`. The application and the API should be running and functional. You should be able to see the homepage and the cards or teasers for the listings. You should be able to navigate to any of the listings detail page by clicking in any of the cards.

## Troubleshooting the local setup

- Q: The application server starts up but I can't see the listings
- A: Go to `http://localhost:7071/api/listings` and make sure you see a JSON printed in the browser.

- Q: The application server starts up but I can't navigate to any of the listings detail pages
- A: Go to `http://localhost:7071/api/listings` and make sure you see a JSON printed in the browser

- Q: The application server starts up but I can't navigate to any of the listings detail pages
- A: Make sure you are accessing the portal served by the SWA CLI `http://localhost:4280` (and not the Angular CLI).

## Deploying to Azure with the Azure Static Web Apps CLI

If you want to deploy to Azure using this tool, you will need an active subscription to [Azure](https://azure.microsoft.com/en-us/free/), to use any of the available regions listed [here](https://azure.github.io/static-web-apps-cli/docs/cli/env-vars)

1. Assuming you are in the folder `contoso-real-estate/packages/portal` go to the terminal and run

```bash
swa deploy
```

2. Follow prompt instructions. 

## Troubleshooting the deployment

If the deployment fails

- **Check** if you exceeded the maximum quota for free apps. Check the limits and quotas for the free tier [here](https://learn.microsoft.com/en-us/azure/static-web-apps/quotas)
- **Check** that your subscription id and tenant id are correctly configured under `contoso-real-estate/packages/portal/.env` for variables

```js
AZURE_SUBSCRIPTION_ID=
AZURE_TENANT_ID=
```

- **Change** the region target to an alternative region, if it's unavailable or saturated - select from regions listed [here](https://azure.github.io/static-web-apps-cli/docs/cli/env-vars)

```js
AZURE_REGION_LOCATION=
```

- **Check** for a configuration file called `staticwebapp.config.json`, under `contoso-real-estate/packages/portal/src/assets/`. Make sure to add the following snippet:

```json
{ 
  // other config: {
  // ... config
  // },
  "platform": {
      "apiRuntime": "node:16"
  } 
}
```

- **Run** If your deployment still fails, run

```bash
swa deploy verbose=silly
```

Copy the log and open an issue in our open-source [Azure Static Web Apps CLI repository](https://github.com/Azure/static-web-apps-cli). We will love to hear from you!

Happy coding! 🚀

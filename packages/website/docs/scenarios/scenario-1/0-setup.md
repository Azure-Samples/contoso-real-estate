---
title: Setup
---

# Document overview: Setup

This document will guide you through the prerequisites and commands necessary to setup and preview the portal project, locally on your computer.

It will also instruct you how to deploy it to [Azure Static Web Apps](https://learn.microsoft.com/azure/static-web-apps/overview), to publish it to the cloud!

## Prerequisites

In order to start the development server for local development or locally browsing the portal site, the following technologies must be installed in your computer:

- [node.js](https://nodejs.org/en/) LTS, with the corresponding npm version
- [Azure Core Tools](https://learn.microsoft.com/azure/azure-functions/functions-run-local)

## Steps to start the portal

1) fork or clone the repository locally
2) assumming you are in the folder containing your clone, go to the terminal and run 

`cd contoso-real-estate && npm install`

Because this is an npm workspaces format repository, you will be installing dependencies for all scenarios, but you don't need to start all development servers.

This operation will also install the [Azure Static Web Apps CLI](https://azure.github.io/static-web-apps-cli/docs/intro). This tool includes a local dev server and emulator, to test the application and the corresponding API together, locally.

3) assuming you are now in the `contoso-real-estate` or _root_ folder, go to the terminal and run

```bash
npm start
```

Follow the [Azure Static Web Apps CLI](https://azure.github.io/static-web-apps-cli/docs/cli/swa) prompts to complete the configuration.

Your default browser should open a new window with the application running. If you did not pass a port option, it should be running at [http://localhost:4280](http://localhost:4280)

4) Assuming you are in the folder `contoso-real-estate/packages/portal` and that you have started the Angular application in the default port 4200, start the emulator by executing 

```bash
swa start http://localhost:4200 --api-location ../api
```

5) Go to `http://localhost:4280`. The application and the API should be running and functional. You should be able to see the homepage and the cards or teasers for the listings. You should be able to navigate to any of the listings detail page by clicking in any of the cards.

## Troubleshooting the local setup

- Q: The application server starts up but I can't see the listings
- A: Go to `http://localhost:7071/api/listings` and make sure you see a JSON printed in the browser.

- Q: The application server starts up but I can't navigate to any of the listings detail pages
- A: Go to `http://localhost:7071/api/listings` and make sure you see a JSON printed in the browser

## Deploying to Azure with the Azure Static Web Apps CLI

If you want to deploy to Azure using this tool, you will need an active subscription to [Azure](https://azure.microsoft.com/en-us/free/), to to any of the available regions listed [here](https://azure.github.io/static-web-apps-cli/docs/cli/env-vars)

Assuming you are in the folder `contoso-real-estate/packages/portal` go to the terminal and run

`swa deploy`

Follow prompt instructions. 

## Troubleshooting the deployment

If the deployment fails

- you may have exceeded the maximum quota for free apps. Check the limits and quotas for the free tier [here](https://learn.microsoft.com/en-us/azure/static-web-apps/quotas)
- your subscription id and tenant id are correctly configured under `contoso-real-estate/packages/portal/.env` for variables

```js
AZURE_SUBSCRIPTION_ID=
AZURE_TENANT_ID=
```

- redefine the region target, in case it's unavailable or saturated

```js
AZURE_REGION_LOCATION=
```

to an alternative region, from the ones listed [here](https://azure.github.io/static-web-apps-cli/docs/cli/env-vars)

- There is a configuration file called `staticwebapp.config.json`, under `contoso-real-estate/packages/portal/src/assets/. Make sure to add the following snippet:

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

If your deployment still fails, run

```bash
swa deploy verbose=silly
```

Copy the log and open an issue in our open-source [Azure Static Web Apps CLI repository](https://github.com/Azure/static-web-apps-cli). We will love to hear from you!

Happy coding! 🚀
# Contoso Real Estate App: API Package

**IMPORTANT: THIS REPOSITORY IS OPTIMIZED FOR CODESPACES AND TO WORK AS A SET OF COMPOSABLE APPS AND APIS. STANDALONE PACKAGE FUNCTIONALITY IS LIMITED AND MAY REQUIRE ADDITIONAL CONFIGURATION OR DEVELOPMENT**


This package deploys an Azure Functions API that is used by the Contoso Real Estate App, with multiple endpoints, and serving multiple applications, that are part of the scenarios.

## Pre-requisites

**IMPORTANT: THIS SCENARIO IS TIGHTLY COUPLED WITH SCENARIO 3. SOME PARTS OF THIS FUNCTION APP MAY NOT WORK AS EXPECTED IF YOU DON'T FOLLOW THE INSTRUCTIONS IN SCENARIO 3. THIS FUNCTION APP QUERIES TWO DATABASES. THEY MAY NEED TO BE IN PLACE IN ORDER FOR THE ENDPOINTS TO WORK**

If you want to run the API independently and locally, the following technologies must be in place:

- [node.js](https://nodejs.org) LTS, with the corresponding npm version
- [Azure Core Tools](https://learn.microsoft.com/azure/azure-functions/functions-run-local)
- [Azure Static Web Apps CLI](https://azure.github.io/static-web-apps-cli/)

## Steps to start the API

1. fork or clone the repository locally
2. assuming you are in the folder containing your clone, go to the terminal and run

```bash
cd packages/api && npm install
```
Now you have all the dependencies installed for the API and can run

```bash
npm start
```

## Stripe API integration

To test Stripe integration, you need to create a Stripe account and get the API keys.

Then, you need to add the following variables in your `packages/api/.env` file:

```bash
STRIPE_PUBLIC_KEY=<YOUR_STRIPE_PUBLIC_KEY>
STRIPE_SECRET_KEY=<YOUR_STRIPE_SECRET_KEY>
STRIPE_WEBHOOK_SECRET=<YOUR_STRIPE_WEBHOOK_SECRET>
```

To test the webhook integration, you need to install the [Stripe CLI](https://stripe.com/docs/stripe-cli) and run the following commands:

```bash
# Make sure the app is running first with `npm start`
stripe login
stripe listen --forward-to localhost:7071/api/checkout/complete
```

Then you can trigger events such as:

```bash
stripe trigger payment_intent.succeeded
```

To test payments, you can use the [Stripe test cards](https://stripe.com/docs/testing#cards).

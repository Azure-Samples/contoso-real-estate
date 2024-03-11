# Contoso Real Estate App: Realtime Notification Package

**IMPORTANT: THIS REPOSITORY IS OPTIMIZED FOR CODESPACES AND TO WORK AS A SET OF COMPOSABLE APPS AND APIS. STANDALONE PACKAGE FUNCTIONALITY IS LIMITED AND MAY REQUIRE ADDITIONAL CONFIGURATION OR DEVELOPMENT**

This document will guide you through the prerequisites and commands necessary to setup the Realtime notification feature for the Portal project.

It will also instruct you how to deploy and publish it to the cloud.

## Prerequisites

**IMPORTANT: THIS SCENARIO IS TIGHTLY COUPLED WITH SCENARIO 2. SOME PARTS OF THIS APP MAY NOT WORK AS EXPECTED IF YOU DON'T FOLLOW THE INSTRUCTIONS IN SCENARIO 2.**

In order to enable and try out the realtime notification feature, you will need to:

1. Create a [Web PubSub For Socket.IO](https://ms.portal.azure.com/#create/Microsoft.WebPubSubForSocketIO) resource.
2. Click `key` tab in resource portal, copy connection string.
3. Rename `.env.example` under `packages/notifications/` to `.env`. Then fill in copied connection string to variable `SERVICE_WEB_PUBSUB_CONNECTION_STRING`
4. From the `Client URL Generator` section, copy the Client Endpoint (e.g. `https://<resource-name>.webpubsub.azure.com`) and Client Path (e.g. `/clients/socketio/hubs/Hub`) and update the `SERVICE_WEB_PUB_SUB_URL` and `SERVICE_WEB_PUB_SUB_PATH` in `./packages/portal/.env` file.

## Steps to start the notification server

1. Assuming you are in `./packages/notifications`, run:

```bash
npm install
```

2. Start the server by running:

```bash
npm start
```
The notification server should be running and functional. You should be able to see the logs in the terminal.
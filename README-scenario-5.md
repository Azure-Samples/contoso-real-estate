This document will guide you through the prerequisites and commands necessary to setup and preview the portal project with complete Stripe integration, locally on your computer.

## Prerequisites

- [VS Code](https://code.visualstudio.com/)
  - You can use any other editor of choice but this guide will assume you are using VS Code
- [VS Code Dev Containers](https://code.visualstudio.com/docs/remote/containers)
  - This will allow you to run the project in a containerized environment

## Project Structure

Within the `packages` folder, you will find the three projects that make up this scenario:

- `portal` - The web app portal
- `api` - The web app backend
- `stripe` - The Stripe backend

## Local Development

_Note: This scenario has been optimised for use with [VS Code Remote Containers](https://code.visualstudio.com/docs/remote/containers), and contains definitions to setup the PostgreSQL database that Strapi uses, and this guide makes the assumption that you will use the dev container._

### Install the required Node.js packages

The repo is a monorepo, and thus contains all the components from all the scenarios. To support this [npm workspaces](https://docs.npmjs.com/cli/using-npm/workspaces) has been configured, and as a result, all scenarios packages will be installed.

To install all packages required run the following command:

```bash
npm install --workspaces
```

_Note: The devcontainer will automatically execute this command on creation, but you can execute it manually if you wish to see the installation happen._

### Configuring Stripe

This scenario uses [Stripe](https://stripe.com) to handle payments. To use Stripe, you will need to create an account and obtain a set of API keys.

1. Create a free Stripe account here: https://dashboard.stripe.com/register
2. Once you have created your account, you will be redirected to the Stripe dashboard. Click on the `Developers` menu item, and then click on the `API keys` tab on the left.
3. Copy the `Public key` and `Secret key` and paste them into a new `.stripe.env` file in the `scripts/infra` folder, like this:

```bash
STRIPE_PUBLIC_KEY=<your public key>
STRIPE_SECRET_KEY=<your secret key>
```

4. Click on the `Webhooks` tab on the left, and then select the `Add endpoint` button. For the endpoint URL, enter `http://dummy.com` and choose the `Select events` option. Search for `checkout`, and enable the events `checkout.session.completed` and `checkout.session.expired`. Then click on the `Add endpoint` button.

5. Copy the `Signing secret key` from your webhook and paste it into the `.stripe.env` file, like this:

```bash
STRIPE_WEBHOOK_SECRET=<your webhook key>
```

### Provisioning the Azure resources

Once your Stripe keys have been configured, you can provision the Azure resources required for this scenario. To do this, run the following command:

```bash
./scripts/infra/setup.sh
```

This all-in-one script will provision all the needed Azure resources, setup the database, build the projects, and deploy them to Azure.

It will also create various `.env` files:
- `scripts/infra/.env`: contains all environments variables and secrets required for deployment
- `.env.local`: contains all environment variables and secrets required for local development, with the services running locally but connected to the Azure database
- `.env.docker`: same as `.env.local` but in a format without quotes that can be used for running Docker containers

### Starting the API

To start the API, run the following command:

```bash
npm run dev --workspace=api
```

> Note: if you're not using the devcontainer or Codespaces, you need to have the [Azure Functions Core Tools](https://learn.microsoft.com/azure/azure-functions/functions-run-local?tabs=v4%2Cmacos%2Ccsharp%2Cportal%2Cbash#install-the-azure-functions-core-tools) installed.

The API will then be running at `http://localhost:7071`.

### Starting the Stripe service

To start the Stripe service, run the following commands:

```bash
npm run docker:build --workspace=stripe
npm run docker:run --workspace=stripe
```

This will build the stripe container and run it locally, listening on port `http://localhost:4242`.

### Starting the portal

To start the portal, run the following commands:

```bash
npm start
```

This will run the Static Web Apps CLI emulator, listening on `http://localhost:4280`.
You can then open this in your browser to test the application.

**Note:** when starting the portal, the API will also start automatically so you don't need to start it separately.
You'll need to start the Stripe service separately though to allow testing the payment flow.

### Running in GitHub Codespaces

An alternative way to run the environment is using [GitHub Codespaces](https://github.com/codespaces), which will use the devcontainer definition, but create a remote containerised environment, rather than running the environment locally.

_Note: GitHub Codespaces is a paid component of GitHub. Review [the GitHub Codespaces billing](https://docs.github.com/en/billing/managing-billing-for-github-codespaces/about-billing-for-github-codespaces) before using it._

To run in GitHub Codespaces, the machine will need at least 4 CPUs and 8GB of memory, which is defined in the [`devcontainer.json`](./.devcontainer/devcontainer.json) file, to ensure all the services are started.

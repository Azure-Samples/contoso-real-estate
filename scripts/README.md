# Scripts

This folder contains scripts used for the infrastructure setup, building, and deployment.
**_IMPORTANT: Please keep in mind that provisioning and deploying this infrastructure will incur costs in your Azure subscription. Please make sure to delete the resources once you are done with this project-_**

## Region

This infrastructure has been tested to be deployable in the following region: _westeurope_

These are internal scripts used for development and testing. We recommend to use Azure Developer CLI instead. You can find more information about it [here](https://docs.microsoft.com/en-us/cli/azure/install-azure-cli).

## Usage

### All-in-one 1 command setup

To setup the entire infrastructure, build the projects, deploy them to Azure, and create the `.env` files needed for local development, run the following command:

```bash
./scripts/infra/setup.sh [environment_name] [--skip-login]
```

> Note: it can take up to 45-60 minutes to complete.

### Scripts usage

```bash
# Make sure you're logged in to Azure
az login

# Create/update infrastructure and .env file
./scripts/infra/infra.sh create

# Build projects and push Docker images
./scripts/infra/build.sh

# Deploy services to Azure
./scripts/infra/deploy.sh

# Restore listings database from a dump file
./scripts/database/restore.sh <dump_file>

# Dump listings database to a file
./scripts/database/dump.sh

# Delete infrastructure
./scripts/infra/infra.sh delete

# Create .env files for local development
./scripts/infra/local.sh
```

## Stripe keys

To be able to deploy the service properly, you need to create a `.stripe.env` file in the `scripts/infra` folder. The file should contain the following environment variables:

```bash
STRIPE_PUBLIC_KEY=<your_stripe_public_key>
STRIPE_SECRET_KEY=<your_stripe_secret_key>
STRIPE_WEBHOOK_SECRET=<your_stripe_webhook_secret>
```

You can find the values for these variables in the [Stripe dashboard](https://dashboard.stripe.com/test/apikeys).

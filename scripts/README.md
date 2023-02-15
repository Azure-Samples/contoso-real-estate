# Scripts

Internal scripts used for development and testing.

## Usage

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
```

## Stripe keys

To be able to deploy the service properly, you need to create a `.stripe.env` file in the `scripts/infra` folder. The file should contain the following environment variables:

```bash
STRIPE_PUBLIC_KEY=<your_stripe_public_key>
STRIPE_SECRET_KEY=<your_stripe_secret_key>
STRIPE_WEBHOOK_SECRET=<your_stripe_webhook_secret>
```

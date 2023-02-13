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

# Deploy to Azure
./scripts/infra/deploy.sh

# Restore listings database from a dump file
./scripts/database/restore.sh <dump_file>

# Dump listings database to a file
./scripts/database/dump.sh

# Delete infrastructure
./scripts/infra/infra.sh delete
```

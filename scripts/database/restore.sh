#!/usr/bin/env bash
##############################################################################
# Usage: ./restore.sh <dump_file>
# Restore database from a dump file.
##############################################################################
# v1.0.0 | dependencies: pg_restore
# v2.0.0 | dependencies: azd
##############################################################################
set -euo pipefail
cd "$(dirname "${BASH_SOURCE[0]}")"

# Run bash script to add variables from key vault
# so the PostgreSQL password is available in this script
source "$2"

STRAPI_DATABASE_MIGRATED="${STRAPI_DATABASE_MIGRATED:-false}"
AZD_INSTALLED=false

# check if azd is installed. We use azd to get values from the azd current env
# If azd is not installed, we get values from current user's session
if [[ -x "$(command -v azd)" ]]; then
  AZD_INSTALLED=true
else
  AZD_INSTALLED=false
fi

# exit if STRAPI_DATABASE_PASSWORD is not set
if [[ -z "$STRAPI_DATABASE_PASSWORD" ]]; then
  echo "[DB MIGRATION] STRAPI_DATABASE_PASSWORD is not set"
  exit 1
fi

# if azd is installed, get values from azd, otherwise get values from .env
if [[ "$AZD_INSTALLED" == "true" ]]; then
  echo "[DB MIGRATION] Getting values from azd"
  azd env get-values > .env
  source .env
  rm .env
else
  echo "[DB MIGRATION] Getting values from .env"
fi


# if database has already been migrated, exit
if [[ "$STRAPI_DATABASE_MIGRATED" == "true" ]]; then
  echo "[DB MIGRATION] Strapi database has already been migrated"
  exit 0
fi

# Skip for local development
if [ ! -f /.dockerenv ]; then
  # Add current public IP to firewall exceptions
  my_public_ip="$(curl -s https://api.ipify.org)"

  echo "[DB MIGRATION] Adding current public IP to firewall exceptions..."
  az postgres flexible-server firewall-rule create \
    --resource-group "rg-$AZURE_ENV_NAME" \
    --name "$CMS_DATABASE_SERVER_NAME" \
    --rule-name "AllowMyIP" \
    --start-ip-address "$my_public_ip" \
    --end-ip-address "$my_public_ip" \
    --output none
fi

filename="${1:-}"
file="$(pwd)/dumps/$filename.sql"

if [[ -z "$file" ]]; then
  echo "[DB MIGRATION] Usage: ./restore.sh <dump_file>"
  exit 1
fi

echo "[DB MIGRATION] Restoring PostgreSQL Database from $file"

# Restore strapi database ----------------------------------------------------
PGPASSWORD="$STRAPI_DATABASE_PASSWORD" pg_restore -v \
  --clean \
  --no-owner \
  --host="$STRAPI_DATABASE_HOST" \
  --username="$STRAPI_DATABASE_USERNAME" \
  --dbname="$STRAPI_DATABASE_NAME" \
  "$file" || true

echo "[DB MIGRATION] PostgreSQL Database restored successfully"

if [[ "$AZD_INSTALLED" == "true" ]]; then
  echo "[DB MIGRATION] Setting STRAPI_DATABASE_MIGRATED to true in azd"
  azd env set STRAPI_DATABASE_MIGRATED true
fi

#!/usr/bin/env bash
##############################################################################
# Usage: ./local.sh
# Creates a local development .env setup for the Contoso App.
##############################################################################
# v1.0.0 | dependencies: grep, xargs
##############################################################################

#!/usr/bin/env bash
set -euo pipefail
cd "$(dirname "${BASH_SOURCE[0]}")"
source .env
source .stripe.env
cd ../..

local_env_file=".env.local"
docker_env_file=".env.docker"

if [[ -f "$local_env_file" ]]; then
  echo "Local .env file already exists. Skipping."
  exit 0
fi

echo "Creating local .env file..."
cat ./scripts/infra/.env > $local_env_file
echo >> $local_env_file

echo "# Stripe environment variables" >> $local_env_file
echo >> $local_env_file
cat ./scripts/infra/.stripe.env >> $local_env_file
echo >> $local_env_file

echo "# Function API environment variables" >> $local_env_file
echo >> $local_env_file
echo "APPINSIGHTS_INSTRUMENTATIONKEY='$APP_INSIGHTS_KEY'" >> $local_env_file
echo "APPLICATIONINSIGHTS_CONNECTION_STRING='$APP_INSIGHTS_CONNECTION_STRING'" >> $local_env_file
echo "STRIPE_SERVICE_URL='http://localhost:4242'" >> $local_env_file
echo >> $local_env_file

echo "# Stripe API environment variables" >> $local_env_file
echo >> $local_env_file
echo "WEB_APP_URL='https://localhost:4280'" >> $local_env_file
echo "API_URL='https://localhost:7071'" >> $local_env_file
echo >> $local_env_file

echo "# Blog environment variables" >> $local_env_file
echo >> $local_env_file
echo "NEXT_PUBLIC_STRAPI_API_URL='http://localhost:1337'" >> $local_env_file
echo >> $local_env_file

echo "# CMS environment variables" >> $local_env_file
echo >> $local_env_file
echo "DATABASE_HOST='$STRAPI_DATABASE_HOST'" >> $local_env_file
echo "DATABASE_PORT='$STRAPI_DATABASE_PORT'" >> $local_env_file
echo "DATABASE_NAME='$STRAPI_DATABASE_NAME'" >> $local_env_file
echo "DATABASE_SSL='$STRAPI_DATABASE_SSL'" >> $local_env_file
echo "DATABASE_USERNAME='$STRAPI_DATABASE_USERNAME'" >> $local_env_file
echo "DATABASE_PASSWORD='$STRAPI_DATABASE_PASSWORD'" >> $local_env_file
echo "STORAGE_ACCOUNT='$STORAGE_ACCOUNT_NAME'" >> $local_env_file
echo "STORAGE_CONTAINER_NAME='$STORAGE_CONTAINER_NAME'" >> $local_env_file
echo "STORAGE_ACCOUNT_KEY='$STORAGE_SAS_KEY'" >> $local_env_file
echo "STORAGE_URL='$STORAGE_CONTAINER_URL/$STORAGE_CONTAINER_NAME'" >> $local_env_file
echo "STORAGE_CDN_URL='$STORAGE_CONTAINER_URL/$STORAGE_CONTAINER_NAME'" >> $local_env_file

genKey() {
  openssl rand -base64 32
}
app_keys="$(genKey),$(genKey)"
jwt_secret="$(genKey)"
admin_jwt_secret="$(genKey)"
api_token_salt="$(genKey)"

echo "APP_KEYS='$app_keys'" >> $local_env_file
echo "JWT_SECRET=$jwt_secret" >> $local_env_file
echo "ADMIN_JWT_SECRET=$admin_jwt_secret" >> $local_env_file
echo "API_TOKEN_SALT=$api_token_salt" >> $local_env_file
echo >> $local_env_file

echo "Local .env file created."

# Docker run doesn't support quotes when using --env-file flag, so we need to
# create a docker-specific .env file without quotes.

echo "Create a docker-specific .env file..."
grep -v '^#' $local_env_file | xargs -n 1 > $docker_env_file
echo "Docker .env file created."

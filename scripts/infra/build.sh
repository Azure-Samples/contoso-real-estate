#!/usr/bin/env bash
set -euo pipefail
cd "$(dirname "${BASH_SOURCE[0]}")"
source .env
cd ../..

echo "Logging into Docker..."
echo "$REGISTRY_PASSWORD" | docker login \
  --username "$REGISTRY_USERNAME" \
  --password-stdin \
  "$REGISTRY_SERVER"

# Build portal ---------------------------------------------------------------
npm ci
npm run build --workspace=portal

# Build api ------------------------------------------------------------------
npm run build --workspace=api

# Build all docker images ----------------------------------------------------
npm run docker:build --if-present --workspaces -- --platform linux/amd64

# Tag and push cms docker image ----------------------------------------------
docker image tag cms "$REGISTRY_NAME.azurecr.io/cms:v1"
docker image push "$REGISTRY_SERVER/cms:v1"

# Tag and push blog docker image ---------------------------------------------
docker image tag cms "$REGISTRY_NAME.azurecr.io/blog:v1"
docker image push "$REGISTRY_SERVER/blog:v1"

# Tag and push stripe docker image -----------------------------------------
docker image tag cms "$REGISTRY_NAME.azurecr.io/stripe:v1"
docker image push "$REGISTRY_SERVER/stripe:v1"

echo "Build complete."

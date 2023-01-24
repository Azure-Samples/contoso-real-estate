#!/bin/sh

# Deploying a SWA API from a monorepo isn't supported by StaticSiteClient
# This script copies the API into a temporary folder, builds it and deploys it using the SWA CLI

# Load environment variables from .env file
export $(grep -v '^#' .env | xargs)

# create a temporary folder
tmpdir=$(mktemp -d)

# copy the API into the temporary folder
cp -r packages/api $tmpdir

# build the API
cd $tmpdir/api
npm install
npm run build
npm prune --production

# deploy the API using SWA CLI (load and override local swa config)
cd -
swa deploy --api-location=$tmpdir/api --deployment-token=$SWA_DEPLOYMENT_TOKEN
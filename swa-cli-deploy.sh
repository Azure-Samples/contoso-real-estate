#!/bin/sh

# Deploying a SWA API from a monorepo isn't supported yet!
# This script copies the API into a temporary folder, builds it and deploys it using the SWA CLI

# Load environment variables from .env file
export $(grep -v '^#' .env | xargs)

# exit if SWA_CLI_DEPLOYMENT_TOKEN is not set
if [ -z "${SWA_CLI_DEPLOYMENT_TOKEN}" ]; then
    echo "SWA_CLI_DEPLOYMENT_TOKEN is not set. Please set it in your .env file or as a secret in your repository."
    exit 1
fi

# set deploy_env to preview flag by default
deploy_env="preview"
git_branch=$(git rev-parse --abbrev-ref HEAD)
tmpdir=$(mktemp -d)

# set deploy_env to production flag if current branch is main
if [ $git_branch = "main" ]; then
  deploy_env="production"
fi

echo "SWA_CLI_DEPLOYMENT_TOKEN found!"
echo "Current branch: $git_branch"
echo "Deployment environment: $deploy_env"
echo "Temporary folder: $tmpdir"

# copy the API into the temporary folder
echo "Copying API into temporary folder..."
cp -r packages/api $tmpdir

# build the API
echo "Building API..."
cd $tmpdir/api
npm install
npm run build
npm prune --production

# deploy the API using SWA CLI (load and override local swa config)
echo "Deploying API..."
cd -
swa deploy --api-location=$tmpdir/api --deployment-token=$SWA_CLI_DEPLOYMENT_TOKEN --env=$deploy_env --verbose=silly
#!/usr/bin/env bash
##############################################################################
# Usage: ./infra.sh <command> [environment_name]
# Manages the Azure infrastructure for this project and generates .env file.
##############################################################################
# v0.1.0 | dependencies: Azure CLI, Node.js, OpenSSL, tr
##############################################################################

set -euo pipefail
cd "$(dirname "${BASH_SOURCE[0]}")"

time=$(date +%s)
subcommand="${1:-}"
project_name="contoso-real-estate"
location="westeurope"
environment="${2:-prod}"
resource_group_name=rg-${project_name}-${environment}
stripe_env_file=".stripe.env"

showUsage() {
  script_name="$(basename "$0")"
  echo "Usage: ./$script_name <command> [environment_name]"
  echo "Manages the Azure infrastructure for this project."
  echo
  echo "Commands:"
  echo "  create   Creates the infrastructure for this project."
  echo "  delete   Deletes the infrastructure for this project."
  echo
}

createInfrastructure() {
  subscription_id=$(az account show --query "id" --output tsv)
  unique_string="$subscription_id $project_name $environment $location"
  uid=$(node -p "require('crypto').createHash('md5').update('$unique_string').digest('hex').substring(0, 13)")
  env_file=".env"
  echo "# Generated settings for environment '$environment'" > "$env_file"
  echo "# Do not edit this file manually!" >> "$env_file"
  echo >> "$env_file"

  # Initial setup ------------------------------------------------------------
  az config set extension.use_dynamic_install=yes_without_prompt

  if [[ -z "${CI-}" ]]; then
    az provider register --namespace Microsoft.App
    az provider register --namespace Microsoft.OperationalInsights
    az provider register --namespace Microsoft.Insights
  fi

  if [[ ! -f "$stripe_env_file" ]]; then
    echo "STRIPE_PUBLIC_KEY=${STRIPE_PUBLIC_KEY:-}" > "$stripe_env_file"
    echo "STRIPE_SECRET_KEY=${STRIPE_SECRET_KEY:-}" >> "$stripe_env_file"
    echo "STRIPE_WEBHOOK_SECRET=${STRIPE_WEBHOOK_SECRET:-}" >> "$stripe_env_file"

    echo "Stripe environment file not found!"
    echo
    echo "We initialized an empty one for you."
    echo "Please edit ./scripts/infra/$stripe_env_file file with the following contents:"
    echo
    echo "STRIPE_PUBLIC_KEY=<your_stripe_public_key>"
    echo "STRIPE_SECRET_KEY=<your_stripe_secret_key>"
    echo "STRIPE_WEBHOOK_SECRET=<your_stripe_webhook_secret>"
    echo
    echo "You can find your Stripe keys at https://dashboard.stripe.com/apikeys"
    echo "If you don't have a Stripe account, you can create one at https://dashboard.stripe.com/register"
    echo
    echo "The application can still work without Stripe, but the payment process will be mocked and bypassed."
  fi

  # Create resource group ----------------------------------------------------
  echo "Creating resource group '$resource_group_name'..."
  az group create \
    --name "$resource_group_name" \
    --location "$location" \
    --tags project="$project_name" environment="$environment" \
    --output none
  echo "RESOURCE_GROUP_NAME='$resource_group_name'" >> "$env_file"

  # Create container registry ------------------------------------------------
  container_registry_name=contosoacr${uid}
  echo "Creating acr '$container_registry_name'..."
  az acr create \
    --name "$container_registry_name" \
    --resource-group "$resource_group_name" \
    --location "$location" \
    --sku Basic \
    --output none
  echo "REGISTRY_NAME='$container_registry_name'" >> "$env_file"
  echo "REGISTRY_SERVER='$container_registry_name.azurecr.io'" >> "$env_file"

  registry_username="contosoAcrToken"
  echo "REGISTRY_USERNAME='$registry_username'" >> "$env_file"

  registry_password=$( \
    az acr token create \
      --name "$registry_username" \
      --registry "$container_registry_name" \
      --repository cms content/write content/read \
      --repository blog content/write content/read \
      --repository stripe content/write content/read \
      --query "credentials.passwords[0].value" \
      --output tsv
  )
  echo "REGISTRY_PASSWORD='$registry_password'" >> "$env_file"

  # Create app insights ------------------------------------------------------
  app_insights_name=contoso-ai-${uid}
  echo "Creating app insights '$app_insights_name'..."
  app_insights_key=$(
    az monitor app-insights component create \
      --app "$app_insights_name" \
      --resource-group "$resource_group_name" \
      --location "$location" \
      --kind web \
      --query "instrumentationKey" \
      --output tsv
  )
  echo "APP_INSIGHTS_NAME='$app_insights_name'" >> "$env_file"
  echo "APP_INSIGHTS_KEY='$app_insights_key'" >> "$env_file"

  app_insights_connection_string=$(
    az resource show \
      --name "$app_insights_name" \
      --resource-group "$resource_group_name" \
      --resource-type "Microsoft.Insights/components" \
      --query properties.ConnectionString \
      --output tsv \
  )
  echo "APP_INSIGHTS_CONNECTION_STRING='$app_insights_connection_string'" >> "$env_file"

  # Create storage account ---------------------------------------------------
  storage_account_name=storage${uid}
  echo "Creating storage account '$storage_account_name'..."
  az storage account create \
    --name "$storage_account_name" \
    --resource-group "$resource_group_name" \
    --location "$location" \
    --sku Standard_LRS \
    --output none
  echo "STORAGE_ACCOUNT_NAME='$storage_account_name'" >> "$env_file"

  storage_sas_key=$(
    az storage account keys list \
      --account-name "$storage_account_name" \
      --query "[?keyName=='key1'].value" \
      --output tsv
  )
  echo "STORAGE_SAS_KEY='$storage_sas_key'" >> "$env_file"

  storage_connection_string=$(
    az storage account show-connection-string \
      --name "$storage_account_name" \
      --query "connectionString" \
      --output tsv
  )
  echo "STORAGE_CONNECTION_STRING='$storage_connection_string'" >> "$env_file"

  storage_container_name=contosostorage-uploads
  az storage container create \
    --name "$storage_container_name" \
    --public-access blob \
    --account-key "$storage_sas_key" \
    --account-name "$storage_account_name" \
    --output none
  echo "STORAGE_CONTAINER_NAME='$storage_container_name'" >> "$env_file"

  storage_container_url=$(
    az storage account show \
      --name "$storage_account_name" \
      --resource-group "$resource_group_name" \
      --query "primaryEndpoints.blob" \
      --output tsv
  )
  echo "STORAGE_CONTAINER_URL='$storage_container_url'" >> "$env_file"

  # Create logs analytics workspace ------------------------------------------
  log_analytics_workspace_name=contoso-logs-${uid}
  echo "Creating log analytics workspace '$log_analytics_workspace_name'..."
  az monitor log-analytics workspace create \
    --resource-group "$resource_group_name" \
    --location "$location" \
    --workspace-name "$log_analytics_workspace_name" \
    --output none

  log_analytics_workspace_client_id=$(
  az monitor log-analytics workspace show \
      --resource-group "$resource_group_name" \
      --workspace-name "$log_analytics_workspace_name" \
      --query customerId  \
      --output tsv | tr -d '[:space:]'
  )
  echo "LOG_ANALYTICS_WORKSPACE_CLIENT_ID='$log_analytics_workspace_client_id'" >> "$env_file"

  log_analytics_workspace_client_secret=$(
    az monitor log-analytics workspace get-shared-keys \
      --resource-group "$resource_group_name" \
      --workspace-name "$log_analytics_workspace_name" \
      --query primarySharedKey \
      --output tsv | tr -d '[:space:]'
  )
  echo "LOG_ANALYTICS_WORKSPACE_CLIENT_SECRET='$log_analytics_workspace_client_secret'" >> "$env_file"

  # Create portal ------------------------------------------------------------
  swa_portal_name=contoso-portal
  echo "Creating swa '$swa_portal_name'..."
  swa_portal_uri=$(
    az staticwebapp create \
      --name "$swa_portal_name" \
      --resource-group "$resource_group_name" \
      --location "$location" \
      --tags project="$project_name" environment="$environment" \
      --sku Standard \
      --output tsv \
      --query defaultHostname
  )
  echo "SWA_PORTAL_NAME='$swa_portal_name'" >> "$env_file"
  echo "SWA_PORTAL_URL='https://$swa_portal_uri'" >> "$env_file"

  swa_portal_deployment_token=$(
    az staticwebapp secrets list \
      --name "$swa_portal_name" \
      --query "properties.apiKey" \
      --output tsv
  )
  echo "SWA_PORTAL_DEPLOYMENT_TOKEN='$swa_portal_deployment_token'" >> "$env_file"

  # Create function api ------------------------------------------------------
  function_api_name=contoso-api-${uid}
  echo "Creating function api '$function_api_name'..."
  function_api_uri=$(
    az functionapp create \
      --name "$function_api_name" \
      --resource-group "$resource_group_name" \
      --consumption-plan-location "$location" \
      --os-type Linux \
      --runtime node \
      --runtime-version 18 \
      --functions-version 4 \
      --storage-account "$storage_account_name" \
      --app-insights "$app_insights_name" \
      --query defaultHostName \
      --output tsv
  )
  echo "FUNCTION_API_NAME='$function_api_name'" >> "$env_file"
  echo "FUNCTION_API_URL='https://$function_api_uri'" >> "$env_file"

  # Create container app env -------------------------------------------------
  container_app_env_name=contoso-cae
  echo "Creating container app env '$container_app_env_name'..."
  az containerapp env create \
    --name "$container_app_env_name" \
    --resource-group "$resource_group_name" \
    --location "$location" \
    --logs-workspace-id "$log_analytics_workspace_client_id" \
    --logs-workspace-key "$log_analytics_workspace_client_secret" \
    --output none
  echo "CONTAINER_APP_ENV_NAME='$container_app_env_name'" >> "$env_file"
  echo "CONTAINER_APP_CMS_NAME='contoso-cms'" >> "$env_file"
  echo "CONTAINER_APP_BLOG_NAME='contoso-blog'" >> "$env_file"
  echo "CONTAINER_APP_STRIPE_NAME='contoso-stripe'" >> "$env_file"

  # Create postgres database -------------------------------------------------
  postgres_db_name=contosopostgres${uid}
  postgres_db_schema=strapi
  postgres_db_admin=contosoAdmin
  postgres_db_pwd=$(openssl rand -base64 32)
  echo "Creating postgres database '$postgres_db_name'..."
  postgres_db_host=$(
    az postgres flexible-server create \
      --name "$postgres_db_name" \
      --resource-group "$resource_group_name" \
      --location "$location" \
      --database-name "$postgres_db_schema" \
      --admin-user "$postgres_db_admin" \
      --admin-password "$postgres_db_pwd" \
      --public all \
      --tier "Burstable" \
      --sku-name "Standard_B1ms" \
      --storage-size 256 \
      --version 14 \
      --query host \
      --output tsv \
    || (az postgres flexible-server update \
      --resource-group "$resource_group_name" \
      --name "$postgres_db_name" \
      --admin-password "$postgres_db_pwd" \
      && az postgres flexible-server show \
        --name "$postgres_db_name" \
        --resource-group "$resource_group_name" \
        --query fullyQualifiedDomainName \
        --output tsv)
  )
  echo "POSTGRES_ACCOUNT_NAME='$postgres_db_name'" >> "$env_file"
  echo "STRAPI_DATABASE_HOST='$postgres_db_host'" >> "$env_file"
  echo "STRAPI_DATABASE_NAME='$postgres_db_schema'" >> "$env_file"
  echo "STRAPI_DATABASE_USERNAME='$postgres_db_admin'" >> "$env_file"
  echo "STRAPI_DATABASE_PASSWORD='$postgres_db_pwd'" >> "$env_file"
  echo "STRAPI_DATABASE_PORT=5432" >> "$env_file"
  echo "STRAPI_DATABASE_SSL=true" >> "$env_file"

  # Create mongo database -------------------------------------------------
  mongo_account_name=contosomongo${uid}
  echo "Creating mongo database '$mongo_account_name'..."
  az cosmosdb create \
    --name "$mongo_account_name" \
    --resource-group "$resource_group_name" \
    --kind MongoDB \
    --server-version 4.0 \
    --default-consistency-level Eventual \
    --locations regionName="$location" failoverPriority=0 isZoneRedundant=False \
    --capabilities EnableServerless \
    --output none
  echo "MONGO_ACCOUNT_NAME='$mongo_account_name'" >> "$env_file"

  mongo_database_name=rentals
  az cosmosdb mongodb database create \
    --resource-group "$resource_group_name" \
    --name "$mongo_database_name" \
    --account-name "$mongo_account_name" \
    --output none
  echo "MONGO_DATABASE_NAME='$mongo_database_name'" >> "$env_file"

  mongo_connection_string=$(
    az cosmosdb keys list \
      --resource-group "$resource_group_name" \
      --name "$mongo_account_name" \
      --type connection-strings \
      --query connectionStrings[0].connectionString \
      --output tsv
  )
  echo "MONGO_CONNECTION_STRING='$mongo_connection_string'" >> "$env_file"

  # Create api management ----------------------------------------------------
  api_management_name=contoso-apim-${uid}
  echo "Creating api management '$api_management_name'..."
  echo "WARNING: This can take up to 40 minutes for the service to get activated."
  az apim create \
    --name "$api_management_name" \
    --resource-group "$resource_group_name" \
    --location "$location" \
    --publisher-email "contoso@email.com" \
    --publisher-name "Contoso" \
    --sku-name Developer \
    --enable-client-certificate \
    --output none
  echo "API_MANAGEMENT_NAME='$api_management_name'" >> "$env_file"

  api_management_url=$(
    az apim list \
      --resource-group "$resource_group_name" \
      --query "[0].gatewayUrl" \
      --output tsv
  )
  echo "API_MANAGEMENT_URL='$api_management_url'" >> "$env_file"

  az apim product create \
    --resource-group "$resource_group_name" \
    --service-name "$api_management_name" \
    --product-id "contoso-public" \
    --product-name "Contoso public APIs" \
    --description "Contoso public APIs" \
    --state published \
    --subscription-required false \
    --output none
  echo "API_MANAGEMENT_PUBLIC_PRODUCT_ID='contoso-public'" >> "$env_file"

  # Link portal backend ------------------------------------------------------
  api_management_api_id=$(
    az apim list \
      --resource-group "$resource_group_name" \
      --query "[0].id" \
      --output tsv
  )
  az staticwebapp backends link \
    --name "$swa_portal_name" \
    --resource-group "$resource_group_name" \
    --backend-resource-id "$api_management_api_id" \
    --backend-region "$location" \
    --output none

  # TODO: vnet for Functions, APIM and Container Apps

  echo "Environment '$environment' of project '$project_name' ready."
  echo "Settings for environment '$environment' saved to '$env_file'."
}

deleteInfrastructure() {
  env_file=".env"
  echo "Deleting environment '$environment' of project '$project_name'..."
  az group delete --yes --name "rg-$project_name-$environment"
  rm -f "$env_file"
  echo "Environment '$environment' of project '$project_name' deleted."
}

if [[ -z "$project_name" ]]; then
  showUsage
  echo "Error: project name is required."
  exit 1
fi

case "$subcommand" in
  create)
    createInfrastructure
    ;;
  delete)
    deleteInfrastructure
    ;;
  *)
    showUsage
    echo "Error: unknown command '$subcommand'."
    exit 1
    ;;
esac
echo "Done in $(($(date +%s) - time))s"

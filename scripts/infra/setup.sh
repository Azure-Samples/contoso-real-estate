#!/usr/bin/env bash
##############################################################################
# Usage: ./setup.sh [environment_name] [--skip-login]
# All-in-one script to setup a new deployed environment and a local
# development setup for the Contoso App.
##############################################################################
# v1.0.0 | dependencies: Azure CLI
##############################################################################
set -euo pipefail
cd "$(dirname "${BASH_SOURCE[0]}")"

showUsage() {
  script_name="$(basename "$0")"
  echo "Usage: ./$script_name [environment_name] [--skip-login]"
  echo "All-in-one script to setup a new deployed environment and a local"
  echo "development setup for the Contoso App."
  echo
  echo "Options:"
  echo "  -s, --skip-login    Skip Azure and GitHub login steps"
  echo
}

stripe_env_file=".stripe.env"
skip_login=false
args=()

while [[ $# -gt 0 ]]; do
  case $1 in
    -s|--skip-login)
      skip_login=true
      shift
      ;;
    --help)
      showUsage
      exit 0
      ;;
    --*|-*)
      showUsage
      echo "Unknown option $1"
      exit 1
      ;;
    *)
      # Save positional arg
      args+=("$1")
      shift
      ;;
  esac
done

# Restore positional args
set -- "${args[@]}"

environment="${1:-prod}"

if [[ "$skip_login" == false ]]; then
  az_login_options=""
  if [[ "${CODESPACES:-}" == true ]]; then
    az_login_options="--use-device-code"
  fi

  echo "Logging in to Azure..."
  az login --query "[].{name:name,id:id}" $az_login_options
  echo "Listed above are your available subscriptions."
  echo

  echo "Currently selected subscription is:"
  az account show \
      --query "{name:name,id:id}" \
      --output tsv
  echo
  read -r -n 1 -p "Is your current subscription correct? (Y/n) " is_correct
  echo

  if [[ "$is_correct" == "n" ]]; then
    read -r -p "Enter your subscription name or ID: " az_sub
    az account set \
      --subscription "$az_sub" \
      --query "{name:name,id:id}" \
      --output tsv
    echo "Azure default subscription has been updated successfully."
  fi

  echo "Login successful."
fi

if [[ ! -f "$stripe_env_file" ]]; then
  echo "STRIPE_PUBLIC_KEY=" > "$stripe_env_file"
  echo "STRIPE_SECRET_KEY=" >> "$stripe_env_file"
  echo "STRIPE_WEBHOOK_SECRET=" >> "$stripe_env_file"

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

echo "Bootstraping new environment '$environment'..."
echo "--- Step 1. Creating Azure resources... ---"
./infra.sh create "$environment"

echo "--- Step 2. Preparing database... ---"
../database/restore.sh ../database/dumps/strapi_20230202.sql

echo "--- Step 3. Building Contoso app... ---"
./build.sh

echo "--- Step 4. Deploying Contoso app... ---"
./deploy.sh

echo "--- Step 5. Creating local development setup... ---"
./local.sh

echo "--- Step 6. Updating Stripe webhook... ---"
source .env
echo "Please go to https://dashboard.stripe.com/test/webhooks and update your webhook endpoint with the following settings:"
echo "  - URL: $API_MANAGEMENT_URL/stripe-api/stripe/webhook"
echo
read -r -s -n 1 -p "Press any key to continue . . ."
echo

echo
echo "Setup success!"

#!/usr/bin/env bash
##############################################################################
# Usage: ./setup.sh [options]
# Setup the current GitHub repo for deploying on Azure.
##############################################################################
# v1.0.0 | dependencies: Azure CLI, GitHub CLI, jq
##############################################################################

set -euo pipefail
cd "$(dirname "${BASH_SOURCE[0]}")"

showUsage() {
  script_name="$(basename "$0")"
  echo "Usage: ./$script_name <project_name>"
  echo "Setup the current GitHub repo for deploying on Azure."
  echo
  echo "Options:"
  echo "  -s, --skip-login    Skip Azure and GitHub login steps"
  echo "  -t, --terminate     Remove secrets from repository"
  echo "  -l, --ci-login      Only perform Azure CLI login using environment credentials"
  echo "  -c, --use-code      Use device code login flow instead of browser"
  echo
}

skip_login=false
terminate=false
ci_login=false
use_code=false
args=()

while [[ $# -gt 0 ]]; do
  case $1 in
    -s|--skip-login)
      skip_login=true
      shift
      ;;
    -t|--terminate)
      terminate=true
      shift
      ;;
    -l|--ci-login)
      ci_login=true
      shift
      ;;
    -c|--use-code)
      use_code=true
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

project_name="contoso-real-estate"

if ! command -v az &> /dev/null; then
  echo "Azure CLI not found."
  echo "See https://aka.ms/tools/azure-cli for installation instructions."
  exit 1
fi

if [[ "$ci_login" == true ]]; then
  echo "Logging in to Azure using \$AZURE_CREDENTIALS..."
  if [[ -z "${AZURE_CREDENTIALS:-}" ]]; then
    echo "Azure credentials not found."
    echo "Please run .azure/setup.sh locally to setup your deployment."
    exit 1
  fi
  client_id="$(echo "$AZURE_CREDENTIALS" | jq -r .clientId)"
  client_secret="$(echo "$AZURE_CREDENTIALS" | jq -r .clientSecret)"
  subscription_id="$(echo "$AZURE_CREDENTIALS" | jq -r .subscriptionId)"
  tenant_id="$(echo "$AZURE_CREDENTIALS" | jq -r .tenantId)"
  az login \
    --service-principal \
    --username "$client_id" \
    --password "$client_secret" \
    --tenant "$tenant_id"
  az account set --subscription "$subscription_id"
  echo "Login successful."
  exit 0
fi

if ! command -v gh &> /dev/null; then
  echo "GitHub CLI not found."
  echo "See https://cli.github.com for installation instructions."
  exit 1
fi

if [[ -z "$project_name" ]]; then
  showUsage
  echo "Error: project name is required."
  exit 1
fi

if [[ "$skip_login" == false ]]; then
  az_login_options=""
  if [[ "$use_code" == true || "${CODESPACES:-}" == true ]]; then
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

  if [[ -z "${GITHUB_TOKEN:-}" || "${CODESPACES:-}" == true ]]; then
    unset GITHUB_TOKEN
    echo "Logging in to GitHub..."
    gh auth login

    if [[ -n "${GITHUB_REPOSITORY:-}" ]]; then
      echo "Setting default GitHub repository to '$GITHUB_REPOSITORY'..."
      gh repo set-default "$GITHUB_REPOSITORY"
    fi
  else
    echo "GITHUB_TOKEN is already set, skipping GitHub login."
  fi

  echo "Login successful."
fi

if [[ "$terminate" == true ]]; then
  echo "Retrieving GitHub repository URL..."
  remote_repo=$(git config --get remote.origin.url)
  gh secret delete AZURE_CREDENTIALS -R "$remote_repo"
  echo "Setup deleted."
else
  echo "Retrieving Azure subscription..."
  subscription_id=$(
    az account show \
      --query id \
      --output tsv \
      --only-show-errors \
    )
  echo "Creating Azure service principal..."
  service_principal=$(
    MSYS_NO_PATHCONV=1 az ad sp create-for-rbac \
      --name="sp-$project_name" \
      --role="Contributor" \
      --scopes="/subscriptions/$subscription_id" \
      --sdk-auth \
      --only-show-errors \
    )
  echo "Retrieving GitHub repository URL..."
  remote_repo=$(git config --get remote.origin.url)
  echo "Setting up GitHub repository secrets..."
  gh secret set AZURE_CREDENTIALS -b"$service_principal" -R "$remote_repo"
  echo "Setup success!"
fi

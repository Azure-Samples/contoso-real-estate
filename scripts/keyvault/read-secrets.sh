#!/usr/bin/env bash
##############################################################################
# Usage: ./read-secrets
# Put Key Vault secrets into environment variables
##############################################################################
# v1.0.0 | dependencies: AZ login via environment
##############################################################################
# load environment variables
DIR="$(dirname "$0")"

# get the filename of the bash script to create
# to add key vault secrets into environment
filename="$1"

# Get Key vault name from environment or 2nd param of bash execution
keyVaultName="${AZURE_KEY_VAULT_NAME:-$2}"

# if key vault name is not set, exit
if [[ -z "$keyVaultName" ]]; then
  echo "[READ SECRETS] Usage: ./read-secrets"
  echo "[READ SECRETS] Please set the AZURE_KEY_VAULT_NAME environment variable"
  exit 1
else
  echo "[READ SECRETS] Key vault name: $keyVaultName"
fi

# get all secrets from the key vault
secrets=$(az keyvault secret list --vault-name "$keyVaultName" --query "[].name" --output tsv)
echo "[READ SECRETS] $secrets"

# if secrets are not set, exit
if [[ -z "$secrets" ]]; then
  echo "[READ SECRETS] No secrets found in key vault"
  exit 1
fi

# loop through each secret
for secretId in $secrets; do

  # get the secret name and value
  secretName=$(basename "$secretId")

  # get the secret value
  secretValue=$(az keyvault secret show --vault-name $keyVaultName --name $secretId --query "value" --output tsv)

  # if secretValue is not empty, convert case and put in environment
  if [[ -z "$secretValue" ]]; then
    echo "[READ SECRETS] Secret value is empty"
    continue
  fi

  # Convert name from kebab-case to SNAKE_CASE
  # Key Vault requires kebab-case, but environment variables require SNAKE_CASE
  secretNameSnakeCase=$(echo "$secretName" | sed -e 's/-/_/g')

  # export the secret as an environment variable
  echo "export $secretNameSnakeCase=\"$secretValue\"" >> $filename
done


#!/usr/bin/env bash
##############################################################################
# Usage: ./read-secrets
# Put Key Vault secrets into environment variables
##############################################################################
# v1.0.0 | dependencies: AZ login via environment
##############################################################################
# load environment variables
DIR="$(dirname "$0")"

keyVaultName="$AZURE_KEY_VAULT_NAME"
echo "[READ SECRETS] Key vault name: $keyVaultName"

# if key vault name is not set, exit
if [[ -z "$keyVaultName" ]]; then
  echo "[READ SECRETS] Usage: ./read-secrets"
  echo "[READ SECRETS] Please set the AZURE_KEY_VAULT_NAME environment variable"
  exit 1
fi

# get all secrets from the key vault
secrets=$(az keyvault secret list --vault-name "$AZURE_KEY_VAULT_NAME" --query "[].name" --output tsv)
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
  echo "export $secretNameSnakeCase=\"$secretValue\"" >> "$DIR/KeyVaultVariables.sh"
done


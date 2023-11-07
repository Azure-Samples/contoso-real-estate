#!/usr/bin/env bash
##############################################################################
# Usage: ./read-secrets
# Put Key Vault secrets into environment variables
##############################################################################
# v1.0.0 | dependencies: AZ login via environment
##############################################################################
# load environment variables
keyVaultName="$AZURE_KEY_VAULT_NAME"

# if key vault name is not set, exit
if [[ -z "$keyVaultName" ]]; then
  echo "Usage: ./read-secrets"
  echo "Please set the AZURE_KEY_VAULT_NAME environment variable"
  exit 1
fi

# get all secrets from the key vault
secrets=$(az keyvault secret list --vault-name "kv-s6ajwqewoawku" --query "[].name" --output tsv)
echo "$secrets"

# if secrets are not set, exit
if [[ -z "$secrets" ]]; then
  echo "No secrets found in key vault"
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
    echo "Secret value is empty"
    continue
  fi

  # Convert name from kebab-case to SNAKE_CASE
  # Key Vault requires kebab-case, but environment variables require SNAKE_CASE
  secretNameSnakeCase=$(echo "$secretName" | sed -e 's/-/_/g')

  # export the secret as an environment variable
  export $secretNameSnakeCase="$secretValue"
done

# print all environment variables for testing
printenv

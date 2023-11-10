#!/usr/bin/env bash
##############################################################################
# Usage: ./restore-db.sh strapi_20230922
# Usage: ./resotre-db.sh strapi_20230922 <key-vault-name>
# Restore database using key vault secret as db password
##############################################################################
# v1.0.0 | dependencies: AZ login via environment
##############################################################################
DUMP_FILE_NAME="$1"

# Key vault name is either in environment or incoming params
KEY_VAULT_NAME="${AZURE_KEY_VAULT_NAME:-$2}"
echo "[RESTORE DB] Key vault name: $KEY_VAULT_NAME"

# Get the directory of the current script
DIR="$(dirname "$0")"

chmod +x "$DIR/keyvault/read-secrets.sh"
chmod +x "$DIR/database/restore.sh"

# Get the absolute path of setsecrets.sh
KEYVAULTSECRETSBASH=$(realpath "$DIR/setsecrets.sh")

# Add Key vault secrets to environment
"$DIR/keyvault/read-secrets.sh" "$KEYVAULTSECRETSBASH" "$KEY_VAULT_NAME"

# Restore database with param
"$DIR/database/restore.sh" "$DUMP_FILE_NAME" "$KEYVAULTSECRETSBASH"

# Remove Key vault secrets file so it isn't checked into source control
rm "$KEYVAULTSECRETSBASH"



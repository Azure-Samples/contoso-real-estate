#!/usr/bin/env bash
##############################################################################
# Usage: ./restore-db.sh
# Restore database using key vault secret as db password
##############################################################################
# v1.0.0 | dependencies: AZ login via environment
##############################################################################
DUMP_FILE_NAME="$1"

# Get the directory of the current script
DIR="$(dirname "$0")"

chmod +x "$DIR/keyvault/read-secrets.sh"
chmod +x "$DIR/database/restore.sh"

# Add Key vault secrets to environment
"$DIR/keyvault/read-secrets.sh"

# Restore database with param
"$DIR/database/restore.sh" "$DUMP_FILE_NAME"




#!/usr/bin/env bash
##############################################################################
# Usage: ./restore-db.sh
# Restore database using key vault secret as db password
##############################################################################
# v1.0.0 | dependencies: AZ login via environment
##############################################################################

# Add Key vault secrets to environment
./scripts/keyvault/read-secrets.sh

# Restore database with param
./scripts/restore-db.sh "$1"




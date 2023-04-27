#!/usr/bin/env bash
##############################################################################
# Usage: ./restore.sh <dump_file>
# Restore database from a dump file.
##############################################################################
# v1.0.0 | dependencies: pg_restore
##############################################################################
set -euo pipefail
cd "$(dirname "${BASH_SOURCE[0]}")"

azd env get-values > .env
source .env
rm .env

filename="${1:-}"
file="$(pwd)/dumps/$filename.sql"

if [[ -z "$file" ]]; then
  echo "Usage: ./restore.sh <dump_file>"
  exit 1
fi

echo "Restoring PostgreSQL Database from $file"

# Restore strapi database ----------------------------------------------------
PGPASSWORD="$STRAPI_DATABASE_PASSWORD" pg_restore -v \
  --clean \
  --no-owner \
  --host="$STRAPI_DATABASE_HOST" \
  --username="$STRAPI_DATABASE_USERNAME" \
  --dbname="$STRAPI_DATABASE_NAME" \
  "$file" || true

if [[ $? -ne 0 ]]; then
  echo "!!Failed to restore PostgreSQL Database"
  exit 1
fi

echo "PostgreSQL Database restored successfully"

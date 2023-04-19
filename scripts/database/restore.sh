#!/usr/bin/env bash
##############################################################################
# Usage: ./restore.sh <dump_file>
# Restore database from a dump file.
##############################################################################
# v1.0.0 | dependencies: pg_restore
##############################################################################
set -euo pipefail
cd "$(dirname "${BASH_SOURCE[0]}")"
if [[ -e "../infra/.env" ]]; then
  source ../infra/.env
fi

file="${1:-}"

if [[ -z "$file" ]]; then
  echo "Usage: ./restore.sh <dump_file>"
  exit 1
fi

# Restore strapi database ----------------------------------------------------
PGPASSWORD="$STRAPI_DATABASE_PASSWORD" pg_restore -v \
  --clean \
  --no-owner \
  --host="$STRAPI_DATABASE_HOST" \
  --username="$STRAPI_DATABASE_USERNAME" \
  --dbname="$STRAPI_DATABASE_NAME" \
  "$file" || true

echo "PostgreSQL Database restored successfully"

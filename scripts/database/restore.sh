#!/usr/bin/env bash
##############################################################################
# Usage: ./restore.sh <dump_file>
# Restore database from a dump file.
##############################################################################
# v1.0.0 | dependencies: pg_restore
##############################################################################
set -euo pipefail
cd "$(dirname "${BASH_SOURCE[0]}")"
source ../infra/.env

file="${1:-}"

if [[ -z "$file" ]]; then
  echo "Usage: ./restore.sh <dump_file>"
  exit 1
fi

# Restore strapi database ----------------------------------------------------
PGPASSWORD="$STRAPI_DATABASE_PASSWORD" pg_restore -v \
  --no-owner \
  --host="$STRAPI_DATABASE_HOST" \
  --username="$STRAPI_DATABASE_USERNAME" \
  --dbname="$STRAPI_DATABASE_NAME" \
  "$file"

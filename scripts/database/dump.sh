#!/usr/bin/env bash
##############################################################################
# Usage: ./dump.sh
# Dumps databases to the /dumps folder.
##############################################################################
# v1.0.0 | dependencies: pg_dump
##############################################################################
set -euo pipefail
cd "$(dirname "${BASH_SOURCE[0]}")"
source ../infra/.env

dumps_folder="./dumps"
date=$(date +%Y%m%d)

mkdir -p "$dumps_folder"

# Dump strapi database -------------------------------------------------------
PGPASSWORD="$STRAPI_DATABASE_PASSWORD" pg_dump -Fc -v \
  --host="$STRAPI_DATABASE_HOST" \
  --username="$STRAPI_DATABASE_USERNAME" \
  --dbname="$STRAPI_DATABASE_NAME" \
  -T "cron.*" \
  -f "$dumps_folder/strapi_$date.sql"

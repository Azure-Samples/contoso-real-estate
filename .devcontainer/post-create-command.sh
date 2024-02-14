#! /bin/bash

sudo apt update
npm i -g npm@latest fuzz-run

# https://github.com/microsoft/playwright/issues/28331
npx --yes playwright install --with-deps

# Azure Functions core tools
npm i -g azure-functions-core-tools@4 --unsafe-perm true

# Install monorepo dependencies
npm install

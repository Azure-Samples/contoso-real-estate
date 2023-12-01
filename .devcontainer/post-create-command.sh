#! /bin/bash

sudo apt update
npm i -g npm@latest fuzz-run

# https://github.com/microsoft/playwright/issues/28331
npx playwright install --with-deps

# Azure Functions core tools
npm i -g azure-functions-core-tools@4 --unsafe-perm true

# Install monorepo dependencies
npm install
<<<<<<< HEAD

=======
npm install -g azure-functions-core-tools@4 --unsafe-perm true
>>>>>>> b6b0f7f775a50878f8369d781c96d2360e7647ca

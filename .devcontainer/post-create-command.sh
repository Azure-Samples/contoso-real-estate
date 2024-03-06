#! /bin/bash

sudo apt update
npm i -g npm@latest fuzz-run

# https://github.com/microsoft/playwright/issues/28331
npx -y playwright install --with-deps

# Install monorepo dependencies
npm install


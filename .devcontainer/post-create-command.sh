#! /bin/bash

sudo apt update
npm i -g npm@latest fuzz-run
npm install

# https://github.com/microsoft/playwright/issues/28331
npx playwright install --with-deps

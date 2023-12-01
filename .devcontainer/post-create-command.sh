#! /bin/bash

sudo apt update
npm i -g npm@latest fuzz-run
npm install
npm install -g azure-functions-core-tools@4 --unsafe-perm true

#! /bin/bash

sudo apt update && sudo apt-get install postgres
nvm install 18.15.0 # See https://github.com/Azure-Samples/contoso-real-estate/pull/191

npm i -g npm@latest fuzz-run
npm install
curl -fsSL https://aka.ms/install-azd.sh | bash

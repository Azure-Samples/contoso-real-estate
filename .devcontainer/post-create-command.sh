#! /bin/bash

sudo apt update && sudo apt-get install postgres
npm i -g npm@latest fuzz-run
npm install
curl -fsSL https://aka.ms/install-azd.sh | bash

---
title: Dev Environment
---

:::tip GUIDANCE

What was your development environment when you engineered this scenario?

I ran through this procedure on a (remove whatever doesn't apply - no expectation that you did this on all options):

- Win
- Mac
- Linux
- container
- VM

You generally interact with the environment with:

- keyboard short cuts - please use those when describing a task - just once - not exhaustively
- Command palatte in VSCode
- Bash commands that you developed to short-circuit longer commands
- etc

If the person writing up the steps doesn't understand how to get from A to C because your B was not obvious - that is what I'm looking for here.
:::

## Operating System

This scenario was developed and tested in MacOS Monterey 12.6 with chip M1, and with the following supporting software

- Node.js v16.16.0 (LTS)
- npm 8.11.0

## VSCode Extensions

The following VSCode extensions were used in this scenario:

- [Azure Account](https://marketplace.visualstudio.com/items?itemName=ms-vscode.azure-account)
- [Azure Core Tools](https://marketplace.visualstudio.com/items?itemName=ms-vscode.vscode-node-azure-pack)
- [Azure Developer CLI](https://marketplace.visualstudio.com/items?itemName=ms-vscode.azurecli)
- [Azure Functions](https://marketplace.visualstudio.com/items?itemName=ms-azuretools.vscode-azurefunctions)
- [Bicep](https://marketplace.visualstudio.com/items?itemName=ms-azuretools.vscode-bicep)

- [Docker](https://marketplace.visualstudio.com/items?itemName=ms-azuretools.vscode-docker)
- [Dev Containers](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.remote-containers)
- [GitHub Codespaces](https://marketplace.visualstudio.com/items?itemName=GitHub.codespaces)

- [JavaScript and TypeScript Nightly](https://marketplace.visualstudio.com/items?itemName=ms-vscode.vscode-typescript-next)
- [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)
- [Prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)
- [Angular Language Service](https://marketplace.visualstudio.com/items?itemName=Angular.ng-template)

- [Microsoft Edge Tools](https://marketplace.visualstudio.com/items?itemName=ms-edgedevtools.vscode-edge-devtools)
- [Playwright](https://marketplace.visualstudio.com/items?itemName=microsoft.vscode-playwright)

## Command Line Tools
If you're working locally, outside of Codespaces and in order to run the commands in this scenario, we recommend the following command line tools installed:

- [Azure CLI](https://docs.microsoft.com/cli/azure/install-azure-cli)
- [Azure Functions Core Tools](https://docs.microsoft.com/en-us/azure/azure-functions/functions-run-local?tabs=macos%2Ccsharp%2Cbash#v2)
- [Azure Developer CLI](https://learn.microsoft.com/azure/developer/azure-developer-cli/overview)
- [Azure Static Web Apps CLI](https://azure.github.io/static-web-apps-cli/)
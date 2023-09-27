# Working with Dev Containers

## Preqrequisites

- [Docker](https://docs.docker.com/get-docker/)
- [Visual Studio Code](https://code.visualstudio.com/)
- [Remote - Containers](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.remote-containers) extension for Visual Studio Code

## Getting Started

1. Clone the repository
2. Open the repository in Visual Studio Code
3. When prompted, select "Reopen in Container"

## Using the Dev Container

The dev container is configured to use the [Remote - Containers](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.remote-containers) extension for Visual Studio Code. This extension allows you to use a Docker container as a full-featured development environment. This means that you can develop in a container without installing any dependencies on your local machine.

The dev container is configured to use `mcr.microsoft.com/devcontainers/javascript-node:0-18` as the base image. This image is based on Debian and includes Node.js v18, eslint, nvm, and yarn. You can learn more about this image [here](https://github.com/microsoft/vscode-dev-containers/tree/main/containers/javascript-node).

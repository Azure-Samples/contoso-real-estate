# Scenario 3: Using Azure Static Web Apps with Azure Functions and Azure Database for PostgreSQL


## Running the project locally in a devcontainer

This scenario has been optimised for use with [VS Code Remote Containers](https://code.visualstudio.com/docs/remote/containers), and contains definitions to setup the PostgreSQL database that Strapi uses, and this guide makes the assumption that you will use the dev container.

### Prerequisites (to run inside of a devcontainer)

- [VS Code](https://code.visualstudio.com/). You can use any other editor of choice but this guide will assume you are using VS Code, because of the `devcontainer` integration.
- [VS Code Dev Containers](https://code.visualstudio.com/docs/remote/containers)
  - This will allow you to run the project in a containerized environment
- To run devcontainers, you must have [Docker](https://www.docker.com/products/docker-desktop) installed in your system.

### Install the required Node.js packages

The repo is a monorepo, and thus contains all the components from all the scenarios. To support this [npm workspaces](https://docs.npmjs.com/cli/using-npm/workspaces) has been configured, and as a result, all scenarios packages will be installed.

To install all packages required run the following command:

```bash
npm install --workspaces
```

_Note: The devcontainer will automatically execute this command on creation, but you can execute it manually if you wish to see the installation happen._

### Starting Strapi

Strapi requires environment variables to provide the various JWT secrets. A sample of the `.env` file can be found at `packages/blog-cms/.env.example` which contains default values for all the required environment variables. Rename this file to `packages/blog-cms/.env`:

```bash
mv .env.example .env
```

_Note: You don't need to set the PostgreSQL environment variables, as these are set in the dev container definition._

To start the Strapi CMS, run the following command:

```bash
npm run develop --workspace blog-cms
```

Strapi will then be running at [`http://localhost:1337/admin`](http://localhost:1337/admin).

_Note: On first run, sample data will be loaded into the database, but you will need to setup an admin user, following the guide on the admin portal._

### 📚 Learn more about Strapi

- [Strapi resource center](https://strapi.io/resource-center) - Strapi resource center.
- [Strapi documentation](https://docs.strapi.io) - Official Strapi documentation.

### Starting Next.js

To start the Next.js application, run the following command:

```bash
npm run dev --workspace blog
```

The Next.js application will then be running at [`http://localhost:3000`](http://localhost:3000).

### Running the project locally without a devcontainer 

If you do not wish to use the use a devcontainer for local development there are some additional steps that need to be undertaken.

A PostgreSQL database is required by Strapi, so one will need to be provisioned.

#### On WSL (using Ubuntu)

  - Update the package list: `sudo apt update`
  - Install PostgreSQL: `sudo apt install postgresql`
  - Confirm that PostgreSQL is active and running `sudo systemctl status postgresql`
  - Confirm that PostgreSQL is accepting connections `sudo -u postgres psql`

#### On MacOS
 
 - We recommend you go to [PostgreSQL.org](https://postgresql.org) and download the required binary version of PostgreSQL for your OS version. This project has been developed and tested on version 12.13. 
- Use installer and follow the instructions to install PostgreSQL on your machine.
- Once installed, confirm that PostgreSQL is active and running `psql -U postgres`


Next, create the database:
  - Switch to the `postgres` system user account: `sudo su - postgres`
  - Then access the PostgreSQL shell: `psql`
  - Create a user for Strapi: `CREATE USER strapi WITH PASSWORD 'strapi';`
  - Create a database for Strapi: `CREATE DATABASE strapi;`
  - Grant privileges to the user: `GRANT ALL PRIVILEGES ON DATABASE strapi TO strapi;`
  - Then quite the PostgreSQL shell: `\q`
  - Restart the PostgreSQL service: `sudo systemctl restart postgresql`

_Note: If you are using a different system, please follow the [PostgreSQL installation guide](https://www.postgresql.org/download/)._

Once the PostgreSQL cluster is up and running and the database is created, the following additional environment variables will need to be provided, either in the `.env` file or globally:

  ```
  DATABASE_HOST= <localhost or IP of your PostgreSQL server>
  DATABASE_USERNAME=strapi
  DATABASE_PASSWORD=strapi
  DATABASE_NAME=strapi
  ```

_Note: The database provided in `DATABASE_NAME` will need to exist on the server before starting Strapi_

Also, please install the following dependencies:

- Install `azd`

  - `azd` is use to provision, manage and deploy the applicaton to Azure. Follow the [install guide for your OS](https://learn.microsoft.com/azure/developer/azure-developer-cli/install-azd)
  - Note: `azd` is not required if you wish to only rely on GitHub Actions or Azure Pipelines to deploy using the provided CI/CD pipelines

- Install Node.js
  - It is encouraged that a Node.js version manager, such as [nvm](https://nvm.sh), is used as a `.nvmrc` file is provided to specify the version of Node.js that is required

### Running in GitHub Codespaces

An alternative way to run the environment is using [GitHub Codespaces](https://github.com/codespaces), which will use the devcontainer definition, but create a remote containerised environment, rather than running the environment locally.

_Note: GitHub Codespaces is a paid component of GitHub. Review [the GitHub Codespaces billing](https://docs.github.com/en/billing/managing-billing-for-github-codespaces/about-billing-for-github-codespaces) before using it._

To run in GitHub Codespaces, the machine will need at least 4 CPUs and 8GB of memory, which is defined in the [`devcontainer.json`](./.devcontainer/devcontainer.json) file, to ensure all the services are started.

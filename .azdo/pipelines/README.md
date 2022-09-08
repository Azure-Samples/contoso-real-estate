# Azure DevOps Pipeline Configuration

This document will show you how to configure an Azure DevOps pipeline that uses the Azure Developer CLI. This logic will eventually be integrated into the `azd pipeline config` command.

You will find a default Azure DevOps pipeline file in `./.azdo/pipelines/azure-dev.yml`. It will provision your Azure resources and deploy your code upon pushes and pull requests.

You are welcome to use that file as-is or modify it to suit your needs.

The following doc has many `bash` commands that need to be executed to get this setup. You can do them one-by-one, or you can [**scroll to the bottom of this page**](#script) to copy and paste them all.

## Set Azure Developer CLI Environment Variables

Your pipeline will need to know which Azure Developer environment and location you are targeting. Update the values below and run the following commands to set those values to be used later in this doc.

```bash
export AZURE_ENV_NAME=
export AZURE_LOCATION=
```

> AZURE_ENV_NAME: This is the name of the environment you want your pipeline to work with. You can find this in the .azure folder.

> AZURE_LOCATION: This is the location you used to deploy your azure developer environment to. You can find this in the .env file in the .azure folder for your environment.

## Set AZURE Environment Variables

Your pipeline will also need to know what subscription you are targeting. Let's configure those environment variables now.

1. Run the following command to get the values needed:

```bash
az account show
```

2. Copy and paste those values after the '=' and run those commands:

```bash
export AZURE_SUBSCRIPTION_NAME=
export AZURE_SUBSCRIPTION_ID=
export AZURE_TENANT_ID=
```

## Create or Use Existing Service Principal

You'll need to create or use an existing Service Principal to manipulate Azure resources from the Azure DevOps pipeline.

If you have an existing Service Principal you'd like to use then you can skip creating one now and just set those environment variable values in the next step.

### Create Service Principal

1. Run the following command to create a new service principal

```bash
az ad sp create-for-rbac --role Contributor --scopes /subscriptions/${AZURE_SUBSCRIPTION_ID}
```

### Set Service Principal Environment Variables

1. Using the output from the `create-for-rbac` command above or your existing service principal, copy the values to the following environment variables and execute the commands to set them.

```bash
export AZURE_SERVICE_PRINCIPAL_ID=
export AZURE_DEVOPS_EXT_AZURE_RM_SERVICE_PRINCIPAL_KEY=
```

> AZURE_SERVICE_PRINCIPAL_ID: The ID of the service principal you just created or existing one that you want to use. It will be the `appId` that is returned from the `create-for-rbac` command.

> AZURE_DEVOPS_EXT_AZURE_RM_SERVICE_PRINCIPAL_KEY: The service principal password. It will be the `password` that is returned from the `create-for-rbac` command.

## Create or Use Existing Azure DevOps Organization

To run a pipeline in Azure DevOps, you'll first need an Azure DevOps organization. You must create an organization using the Azure DevOps portal here: https://dev.azure.com.

Once you have that organization, copy and paste it below, then run the commands to set those environment variables.

```bash
export AZURE_DEVOPS_ORG_NAME=
export AZURE_DEVOPS_ORG_URI=https://dev.azure.com/${AZURE_DEVOPS_ORG_NAME}
```

> AZURE_DEVOPS_ORG_NAME: The name of the Azure DevOps organization that you just created or existing one that you want to use.

## Create or Use an Existing Azure DevOps Project

To run a pipeline in Azure DevOps, you're organization will need a project and a repo.

First, set the environment variable with the name of the project you want to create or use:

> You don't have to change this value if you want to use the same name as your env name.

```bash
export AZURE_DEVOPS_PROJECT_NAME=${AZURE_ENV_NAME}
```

> AZURE_DEVOPS_PROJECT_NAME: The name of the Azure DevOps project that you want to create or use an existing one.

Then, if you want to create a new project, you can do so with the following command:

```bash
az devops project create --name ${AZURE_DEVOPS_PROJECT_NAME} --org ${AZURE_DEVOPS_ORG_URI}
```

## Create or Use an Existing Azure DevOps Repo

If you created the Project with the CLI command above then it has also created a new repo with the same name as your project. You can use that repo for this pipeline, or you can select a different one.

If you want to use the repo that was created, then run this command.

```bash
export AZURE_DEVOPS_REPO_NAME=${AZURE_DEVOPS_PROJECT_NAME}
```

If you want to use a different repo, then input that repo name below and run that command:

```bash
export AZURE_DEVOPS_REPO_NAME=
```

> AZURE_DEVOPS_REPO_NAME: The name of the Azure DevOps repo that you want to use, if you don't want to use the default.

NOTE: You can get repo info using the following command:

```bash
az repos show --repository ${AZURE_DEVOPS_REPO_NAME} --project ${AZURE_DEVOPS_PROJECT_NAME} --org ${AZURE_DEVOPS_ORG_URI}
```

## Push Code to Repo

Now that we have the Azure DevOps org, project, and repo setup, we can push the code to that repo.

Let's get the remote url into an environment variable:

```bash
export BRANCH_NAME=main
export AZURE_REPO_REMOTE_URL=$(az repos show --repository ${AZURE_DEVOPS_REPO_NAME} --project ${AZURE_DEVOPS_PROJECT_NAME} --org ${AZURE_DEVOPS_ORG_URI} --query remoteUrl -o tsv)
```

Initialize the current directory as a git repo (if not already done):

> This script assumes your default branch is 'main'. You can set your default branch with this command: `git config --global init.defaultBranch main` and see what your current default branch is with this command: `git config --list`.

```bash
git init
git checkout -b ${BRANCH_NAME}
git add .
git commit -m "init"
```

Then add that as a remote:

```bash
git remote add ${AZURE_DEVOPS_REPO_NAME} ${AZURE_REPO_REMOTE_URL}
```

Then push the code:

```bash
git push -u ${AZURE_DEVOPS_REPO_NAME} ${BRANCH_NAME}
```

> You may get prompted to enter a password to Azure DevOps here. Go to https://dev.azure.com and get a personal access token and then paste it into the console.

## Create Azure DevOps Service Connection

Azure DevOps uses a ["Service Connection"](https://docs.microsoft.com/azure/devops/pipelines/library/service-endpoints?view=azure-devops&tabs=yaml) to communicate with Azure from an Azure DevOps pipeline.

First set the connection name by running the following command:

```bash
export AZURE_DEVOPS_SERVICE_CONNECTION_NAME=azconnection
```

> If you change `AZURE_DEVOPS_SERVICE_CONNECTION_NAME` to something other than `azconnection`, then you also need to update the `azureSubscription` value in `./.azdo/pipelines/azure-dev.yml` to match that new name.

Now, let's create the service connection:

```bash
az devops service-endpoint azurerm create --azure-rm-service-principal-id ${AZURE_SERVICE_PRINCIPAL_ID} --azure-rm-subscription-id ${AZURE_SUBSCRIPTION_ID} --azure-rm-subscription-name ${AZURE_SUBSCRIPTION_NAME} --azure-rm-tenant-id ${AZURE_TENANT_ID} --name ${AZURE_DEVOPS_SERVICE_CONNECTION_NAME} --project ${AZURE_DEVOPS_PROJECT_NAME} --org ${AZURE_DEVOPS_ORG_URI}
```

If you didn't set the `AZURE_DEVOPS_EXT_AZURE_RM_SERVICE_PRINCIPAL_KEY` environment variable to your Service Principal's password, then you'll be prompted to enter that password.

Next, we need to update the service connection to allow connections from any pipeline. We can do so with the following command:

```bash
export AZURE_DEVOPS_SERVICE_CONNECTION_ID=$(az devops service-endpoint list --project ${AZURE_DEVOPS_PROJECT_NAME} --org ${AZURE_DEVOPS_ORG_URI} --query "[?contains(name, '${AZURE_DEVOPS_SERVICE_CONNECTION_NAME}')].id" -o tsv)
az devops service-endpoint update --id ${AZURE_DEVOPS_SERVICE_CONNECTION_ID} --project ${AZURE_DEVOPS_PROJECT_NAME} --org ${AZURE_DEVOPS_ORG_URI} --enable-for-all true
```

## Create an Azure DevOps Pipeline

Now we are ready to create the pipeline in Azure DevOps.

Let's first set the pipeline name environment variable. You can change this value if you'd like to.

```bash
export AZURE_DEVOPS_PIPELINE_NAME=azdpipeline
```

Now let's create the pipeline by running the following command:

```bash
az pipelines create --name ${AZURE_DEVOPS_PIPELINE_NAME} --branch ${BRANCH_NAME} --project ${AZURE_DEVOPS_PROJECT_NAME} --org ${AZURE_DEVOPS_ORG_URI} --repository ${AZURE_DEVOPS_REPO_NAME} --repository-type tfsgit --yml-path "./.azdo/pipelines/azure-dev.yml" --service-connection ${AZURE_DEVOPS_SERVICE_CONNECTION_NAME} --skip-first-run
```

## Set Pipeline Environment Variables

Run the following commands to set the environment variables in the Azure DevOps pipeline needed to run the pipeline and target the appropriate environment.

```bash
az pipelines variable create --name AZURE_SUBSCRIPTION_ID --org ${AZURE_DEVOPS_ORG_URI} --pipeline-name ${AZURE_DEVOPS_PIPELINE_NAME} --project ${AZURE_DEVOPS_PROJECT_NAME} --value ${AZURE_SUBSCRIPTION_ID} --allow-override true
az pipelines variable create --name AZURE_LOCATION --org ${AZURE_DEVOPS_ORG_URI} --pipeline-name ${AZURE_DEVOPS_PIPELINE_NAME} --project ${AZURE_DEVOPS_PROJECT_NAME} --value ${AZURE_LOCATION} --allow-override true
az pipelines variable create --name AZURE_ENV_NAME --org ${AZURE_DEVOPS_ORG_URI} --pipeline-name ${AZURE_DEVOPS_PIPELINE_NAME} --project ${AZURE_DEVOPS_PROJECT_NAME} --value ${AZURE_ENV_NAME} --allow-override true
```

## Create Azure DevOps Build Policy

If you would like the pipeline to run every time a PR is created, then you'll need to create a build policy to do so.

Run these commands to set the environment variables needed for the next command:

```bash
export AZURE_DEVOPS_REPO_ID=$(az repos show --repository ${AZURE_DEVOPS_REPO_NAME} --project ${AZURE_DEVOPS_PROJECT_NAME} --org ${AZURE_DEVOPS_ORG_URI} --query id -o tsv)
export AZURE_DEVOPS_PIPELINE_BUILD_DEFINITION_ID=$(az pipelines build definition show --project ${AZURE_DEVOPS_PROJECT_NAME} --org ${AZURE_DEVOPS_ORG_URI} --name ${AZURE_DEVOPS_PIPELINE_NAME} --query id)
```

Run this command to create the policy:

```bash
az repos policy build create --blocking true --project ${AZURE_DEVOPS_PROJECT_NAME} --org ${AZURE_DEVOPS_ORG_URI} --branch ${BRANCH_NAME} --repository-id ${AZURE_DEVOPS_REPO_ID} --enabled true --build-definition-id ${AZURE_DEVOPS_PIPELINE_BUILD_DEFINITION_ID} --queue-on-source-update-only false --manual-queue-only false --display-name "PR Build Policy" --valid-duration 0
```

## Conclusion

That is everything you need to have in place to get the Azure DevOps pipeline running. You can verify that it is working by going to the Azure DevOps portal (https://dev.azure.com) and finding the pipeline you just created.

## Script

You can copy and paste the following into a text editor so you can easily fill in the env var values.

```bash

# AZURE DEV ENV VARS
    # Get the following values from .azure folder
    export AZURE_ENV_NAME=
    export AZURE_LOCATION=

# AZURE ENV VARS
    # Run this:
    az account show
    # Put values here:
    export AZURE_SUBSCRIPTION_NAME=
    export AZURE_SUBSCRIPTION_ID=
    export AZURE_TENANT_ID=

# SERVICE PRINCIPAL
    # Run this to create SP
    az ad sp create-for-rbac --role Contributor --scopes /subscriptions/${AZURE_SUBSCRIPTION_ID}

	# Save the above output just in case you need it later

    # Put values here:
    export AZURE_SERVICE_PRINCIPAL_ID=
    export AZURE_DEVOPS_EXT_AZURE_RM_SERVICE_PRINCIPAL_KEY=

# AZURE DEVOPS ORG
    export AZURE_DEVOPS_ORG_NAME=

    # You don't need to update the following line:
    export AZURE_DEVOPS_ORG_URI=https://dev.azure.com/${AZURE_DEVOPS_ORG_NAME}

# AZURE DEVOPS PROJECT
    # You can change the AZURE_DEVOPS_PROJECT_NAME value if you don't want it to be the same as your env name
	export AZURE_DEVOPS_PROJECT_NAME=${AZURE_ENV_NAME}

    az devops project create --name ${AZURE_DEVOPS_PROJECT_NAME} --org ${AZURE_DEVOPS_ORG_URI}

# AZURE DEVOPS REPO
    export AZURE_DEVOPS_REPO_NAME=${AZURE_DEVOPS_PROJECT_NAME}

    # Use following if you change the repo name to something other than the project name
    # export AZURE_DEVOPS_REPO_NAME=

# PUSH CODE
    # Change branch name if necessary
    export BRANCH_NAME=main
    export AZURE_REPO_REMOTE_URL=$(az repos show --repository ${AZURE_DEVOPS_REPO_NAME} --project ${AZURE_DEVOPS_PROJECT_NAME} --org ${AZURE_DEVOPS_ORG_URI} --query remoteUrl -o tsv)

    git init
    git checkout -b ${BRANCH_NAME}
    git add .
    git commit -m "init"
    git remote add ${AZURE_DEVOPS_REPO_NAME} ${AZURE_REPO_REMOTE_URL}
    git push -u ${AZURE_DEVOPS_REPO_NAME} ${BRANCH_NAME}

    # You may get prompted to enter a password to Azure DevOps here.  Go to https://dev.azure.com and get a personal access token and then paste it into the console.

# AZURE DEVOPS SERVICE CONNECTION
    export AZURE_DEVOPS_SERVICE_CONNECTION_NAME=azconnection

    az devops service-endpoint azurerm create --azure-rm-service-principal-id ${AZURE_SERVICE_PRINCIPAL_ID} --azure-rm-subscription-id ${AZURE_SUBSCRIPTION_ID} --azure-rm-subscription-name ${AZURE_SUBSCRIPTION_NAME} --azure-rm-tenant-id ${AZURE_TENANT_ID} --name ${AZURE_DEVOPS_SERVICE_CONNECTION_NAME} --project ${AZURE_DEVOPS_PROJECT_NAME} --org ${AZURE_DEVOPS_ORG_URI}

# AZURE DEVOPS SERVICE CONNECTION PERMISSIONS
    export AZURE_DEVOPS_SERVICE_CONNECTION_ID=$(az devops service-endpoint list --project ${AZURE_DEVOPS_PROJECT_NAME} --org ${AZURE_DEVOPS_ORG_URI} --query "[?contains(name, '${AZURE_DEVOPS_SERVICE_CONNECTION_NAME}')].id" -o tsv)

    az devops service-endpoint update --id ${AZURE_DEVOPS_SERVICE_CONNECTION_ID} --project ${AZURE_DEVOPS_PROJECT_NAME} --org ${AZURE_DEVOPS_ORG_URI} --enable-for-all true

# AZURE DEVOPS PIPELINE
    export AZURE_DEVOPS_PIPELINE_NAME=azdpipeline

    az pipelines create --name ${AZURE_DEVOPS_PIPELINE_NAME} --branch ${BRANCH_NAME} --project ${AZURE_DEVOPS_PROJECT_NAME} --org ${AZURE_DEVOPS_ORG_URI} --repository ${AZURE_DEVOPS_REPO_NAME} --repository-type tfsgit --yml-path "./.azdo/pipelines/azure-dev.yml" --service-connection ${AZURE_DEVOPS_SERVICE_CONNECTION_NAME} --skip-first-run

# AZURE DEVOPS PIPELINE VARIABLES
    az pipelines variable create --name AZURE_SUBSCRIPTION_ID --org ${AZURE_DEVOPS_ORG_URI} --pipeline-name ${AZURE_DEVOPS_PIPELINE_NAME} --project ${AZURE_DEVOPS_PROJECT_NAME} --value ${AZURE_SUBSCRIPTION_ID} --allow-override true
    az pipelines variable create --name AZURE_LOCATION --org ${AZURE_DEVOPS_ORG_URI} --pipeline-name ${AZURE_DEVOPS_PIPELINE_NAME} --project ${AZURE_DEVOPS_PROJECT_NAME} --value ${AZURE_LOCATION} --allow-override true
    az pipelines variable create --name AZURE_ENV_NAME --org ${AZURE_DEVOPS_ORG_URI} --pipeline-name ${AZURE_DEVOPS_PIPELINE_NAME} --project ${AZURE_DEVOPS_PROJECT_NAME} --value ${AZURE_ENV_NAME} --allow-override true

# AZURE DEVOPS BUILD POLICY
    export AZURE_DEVOPS_REPO_ID=$(az repos show --repository ${AZURE_DEVOPS_REPO_NAME} --project ${AZURE_DEVOPS_PROJECT_NAME} --org ${AZURE_DEVOPS_ORG_URI} --query id -o tsv)
    export AZURE_DEVOPS_PIPELINE_BUILD_DEFINITION_ID=$(az pipelines build definition show --project ${AZURE_DEVOPS_PROJECT_NAME} --org ${AZURE_DEVOPS_ORG_URI} --name ${AZURE_DEVOPS_PIPELINE_NAME} --query id)

    az repos policy build create --blocking true --project ${AZURE_DEVOPS_PROJECT_NAME} --org ${AZURE_DEVOPS_ORG_URI} --branch ${BRANCH_NAME} --repository-id ${AZURE_DEVOPS_REPO_ID} --enabled true --build-definition-id ${AZURE_DEVOPS_PIPELINE_BUILD_DEFINITION_ID} --queue-on-source-update-only false --manual-queue-only false --display-name "PR Build Policy" --valid-duration 0

# RUN AZURE DEVOPS PIPELINE
    az pipelines run --name ${AZURE_DEVOPS_PIPELINE_NAME} --project ${AZURE_DEVOPS_PROJECT_NAME} --org ${AZURE_DEVOPS_ORG_URI}
```

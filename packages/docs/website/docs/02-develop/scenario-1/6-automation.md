---
title: Pipeline Automation
---

## Deployment

This scenario is designed to be deployed using the [Azure Dev CLI (`azd`)](https://aka.ms/azd).

### Prerequisites

Before deploying with `azd`, you will need to login to your Azure account and provision the infrastructure:

```bash
azd provision
```

Follow the prompts to authenticate the CLI, select a subscription, name the environment, and provision the infrastructure.

Once the provisioning phase is complete, the following resources will be available:

- Azure Database for PostgreSQL
- Azure Storage Account
- Azure Container Apps Environment
- Azure Container Apps (two will be created, one for the blog and one for the CMS)
- Azure Container Registry

### Deploy

To deploy each project in the scenario, use the `azd deploy --service <service name>` command:

```bash
azd deploy --service cms
azd deploy --service blog
```

Once deployment is completed, you can navigate to the URL provided for the application to view it.

## Bicep files

The provisioning of the infarstructure is defined in the `infa` folder, using [Bicep](https://docs.microsoft.com/azure/azure-resource-manager/bicep/overview), with the two components being defined at `infra/app/blog-cms.bicep` and `infra/app/blog.bicep`.

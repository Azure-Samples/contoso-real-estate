---
title: Pipeline Automation
---

:::tip GUIDANCE

What automation is used to complete this scenario?

* Resource management scripts (Az CLI, AZD cli, SWA CLI, Func CLI, PowerShell)
* GitHub Actions, Azure DevOps Pipelines
* AAD automation
* Custom or 3rd party automation
    * GH CLI
    * Stripe CLI
    * Mongo CLI
* Any `hidden` or poorly known areas such as https://resources.azure.com - explain why you needed it so that can translate into content. 

All automation must include cleanup/teardown scripts
:::

## GitHub Actions

When an application is deployed to Azure Static Web Apps, a workflow file is automatically generated and, if the repository is already hosted with GitHub, pushed to it. This file contains the necessary instructions to enable CI/CD integrations for build and deployment, and can be extended with additions actions, both custom or from the [GitHub Marketplace](https://github.com/marketplace?type=actions)

If you would like to learn more about GitHub Actions, follow [this link](https://docs.github.com/en/actions/learn-github-actions/understanding-github-actions)

## SWA CLI

Our application is deployed to Azure Static Web Apps, to facilitate the resource management, we are using the Azure Static Web Apps CLI tool. This command line tool has extensive documentation, that can be found [here](https://azure.github.io/static-web-apps-cli/)
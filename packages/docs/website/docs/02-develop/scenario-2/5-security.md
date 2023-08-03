---
title: Security & Identity
---

:::tip GUIDANCE
Any information about what is provided for security/identity and what is not.

- RBAC
- Easy auth
- MSAL
- VNet
- Firewalls
- CORS
- AAD apps
- 3rd party auth (GitHub, Stripe, etc)
  :::

## Secrets

This scenario needs to connect to a database. Database connection strings should be stored in the corresponding .env file, and either on the Azure Static Web Apps configuration tab, as remote Environment Variables, or in Key Vault.

## CORS

To prevent CORS issues, start the project locally with the [Azure Static Web Apps CLI](https://azure.github.io/static-web-apps-cli/).

## Authentication

To enable user authentication, this project implements [Azure Static Web Apps Easy Auth](https://docs.microsoft.com/azure/static-web-apps/authentication-authorization). You can find detailed guidelines visiting [scenario 4](/develop/scenario-4).

---
title: Federated Authentication
---

## Overview

[Azure Static Web Apps](https://learn.microsoft.com/azure/static-web-apps/authentication-authorization) provides a built-in authentication and authorization capability, which allows you to authenticate users and authorize them to access your application. This capability is based on [Azure Active Directory B2C](https://docs.microsoft.com/en-us/azure/active-directory-b2c/overview) and [OpenID Connect](https://docs.microsoft.com/en-us/azure/active-directory-b2c/overview).

In our case, we will use a pre-configured provider. You can enable your required provider or block providers you don't want to use. Azure Static Web Apps supports the following providers:

- Azure Active Directory
- GitHub

In this document, we will use GitHub as the provider.

## Custom Authentication Provider

Azure Static Web Apps also allows you to use a custom authentication provider, but we won't describe this option in this document.

### Built-in roles

Once you have enabled authentication, Azure Static Web Apps will offer two built-in roles for you. These roles are:

- anonymous
- authenticated

The `anonymous` role is assigned to all users, including unauthenticated users. The `authenticated` role is assigned to all authenticated users.

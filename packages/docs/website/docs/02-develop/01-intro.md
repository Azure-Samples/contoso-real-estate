---
slug: /develop
title: Introduction
description: Let's talk about how the Contoso Real Estate Application was developed.
---

# Overview

The [reference implementation](https://github.com/Azure-Samples/contoso-real-estate) demonstrates how to build a modern web application (Contoso Rentals) via a _series of extensible scenarios_, using best-in-class developer tools with relevant Azure and 3rd-party service integrations. 

![E2E Reference Architecture For Contoso Real Estate](./../../../../../assets/diagrams/e2e-full-horizontal.drawio.png)

Here is what the final architecture (with 7 scenarios) looks like. The scenarios are designed to be self-contained and usable as a reference for your own projects.

 1. **Setup**: Some of the scenarios require a setup step, to prepare your environment for the development of the application. The setup steps are described in the corresponding scenario folder.
 2. **Dependencies**: Some of the scenarios have dependencies on other scenarios. For example, scenario 4 depends on scenarios 1 and 3. In this case, the setup steps for scenario 4 will include references to the setup steps for those scenarios.



## What You'll Build

In this tutorial, you'll create a serverless web application that  enables enterprise users to look for (and reserve) temporary home rentals in a desired location. You'll build the application as a series of 8 scenarios, each showcasing best practices for developing core modern web app features including:
 * Static Web App Hosting
 * Serverless API Integration
 * Serverless Database Integration
 * Federated User Authentication 
 * Integrated Search & Recommendations
 * Integration with Third Party (Payments) API
 * End-to-End Application Testing
 * Application Monitoring & Insights

## What You'll Learn
 - Designing a Composable Application Architecture
 - Employing a Micro-Frontend Development Pattern
 - Scaling with a Microservices-driven Backend
 - Integrating automated End-to-End Testing 
 - Simplifying deployment with Azure Developer CLI Templates

## Cost To Complete

 * We prioritize for services in the **[Azure Free Tier](https://azure.microsoft.com/en-us/free/search/)** by default.
 * We provide cost estimates (with [**Azure Pricing Calculator**](https://azure.microsoft.com/en-us/pricing/calculator/)) for usage beyond free tier.
 * **Delete resources setup for this exercise** on completion to prevent future charges.

:::danger TODO: PROVIDE COST ESTIMATE IF OUTSIDE FREE TIER
:::


## Contributions Welcome

Contribute to the [reference implementation](https://github.com/Azure-Samples/contoso-real-estate) directly by opening a pull request or filing an issue on that repository. We would love to get your feedback on how you are re-implementing the reference architecture, or extending the reference implementation, in your own projects.

Have feedback on this developer guide? Share your questions and comments via the relevant topic on our [Discussion Forum](https://github.com/Azure-Samples/contoso-real-estate/discussions). Use this also to share your own insights or observations with community peers.

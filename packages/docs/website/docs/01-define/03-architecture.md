---
slug: /architecture
title: The Architecture
description: Let's talk about Contoso Real Estate Application architecture style
---

## Design Challenges

Designing a muti-scenario application is complex enough. Making it enterprise-grade requires us to keep additional constraints in mind when designing the architecture:

 - **Ownership** - is everything built by one team, or many?
 - **Prioritization** - does one scenario have a dependency on another?
 - **Extensibility** - are scenarios likely to be extended or modified later?
 - **Quality** - is architecture reliable, cost-effective and performant?

We use these questions to determine how we _structure_ our project (repo), _implement_ our scenarios (sequence), and _design_ our architecture (choices) in the Contoso Real Estate app.

## Architecture Fundamentals

A good starting point for learners is the [Azure Architecture Center](https://learn.microsoft.com/azure/architecture/). It has extensive resources in design patterns and enterprise scenarios, with guidance on technology choices and workload optimization. It advocates a simple 4-step approach to developing modern apps:

1. **Architecture Style** - identify the right architecture pattern for your scenario.
1. **Technology Choices** - decide your core Compute, Storage & Messaging resources.
1. **Architecture Design** - explore reference arch., design patterns & best practices.
1. **Assess Quality** - review for 5 pillars for software quality: _reliability, security, cost optimization, operational excellence and performance efficiency._

For self-guided exploration of relevant architecture concepts and design patterns, *bookmark and revisit* these two resources from the Architecture Center.

 - [Azure Architectures Browser](https://learn.microsoft.com/azure/architecture/browse/) - find real-world examples of cloud architectures with solution ideas for common workloads and insights for **technology choices.**
 -  [Azure Well-Architectured Framework](https://learn.microsoft.com/azure/well-architected/) - find guiding tenets for **assessing the quality** of your workloads, and tools for reviewing and remediating identified issues.

For now, let's dive in with step 1 - identify the right architecture pattern - for the Contoso Real Estate application scenarios.

## Composable Architecture

We want to build a reference architecture and implementation for a enterprise-grade application with _extensible scenarios_, that can be repurposed and evolved rapidly to suit changing needs. A [2020 Gartner keynote](https://www.gartner.com/smarterwithgartner/gartner-keynote-the-future-of-business-is-composable) identified **composable architectures** as the growing trend for enterprise applications that were built for resilience and agility.

Generally speaking, composable architectures focus on design patterns and principles where more complex solutions are **assembled** (in build-deploy pipelines) from simpler components that can be developed by independent teams, using best-in-class tools and technologies. _This addresses our design challenges in ownership, prioritization, extensibility and quality, making it a good architecture style for the Contoso Real Estate app_

More concretely, we have industry initiatives like the [MACH Architecture](https://macharchitecture.com/) which promotes a composable architecture design based on four technology pillars:
 - **Microservices** - where the backend is built as loosely-coupled distributed services.
 - **API-first** - where service functionality is exposed as API (contracts) defined up front.
 - **Cloud-native** - where apps & services are pre-designed to take advantage of cloud scale.
 - **Headless** - where frontend choices are decoupled from backends to support flexible UI/UX.

In the rest of this section, we'll explore what these pillars mean in the context of our reference implementation. _The Contoso Real Estate reference implementation is the first JavaScript on Azure sample that demonstrates a composable enterprise architecture pattern_.

## Cloud-native Technology

Cloud-native is one of the four technology pillars of the composable enterprise architecture. The [Cloud Native Computing Foundation](https://github.com/cncf/toc/blob/main/DEFINITION.md) defines cloud-native as:

 *  **technologies** that empower organizations to build and run scalable applications in modern, dynamic environments such as public, private, and hybrid clouds. _Ex: Containers, service meshes, microservices, immutable infrastructure, and declarative APIs_.
 * **techniques** that enable loosely coupled systems that are resilient, manageable, and observable. Combined with robust automation, they allow engineers to make high-impact changes frequently and predictably with minimal toil.

The [simpler definition](https://learn.microsoft.com/dotnet/architecture/cloud-native/definition) is that cloud-native enables solutions to be _built in the cloud and take full advantage of the cloud computing model_ as visualized by five core technology pillars in Azure.

![5 Pillars of Cloud-Native](https://learn.microsoft.com/dotnet/architecture/cloud-native/media/cloud-native-foundational-pillars.png)

In the [Develop](/develop) section of this guide, we'll dive into more details on the specific cloud-native technologies and techniques used in our Contoso Real Estate App reference implementation.

## Microservices

Microservices are the second pillar of the composable enterprise architecture - and a core part of cloud-native solutions on Microsoft Azure. They are [defined as](https://learn.microsoft.com/devops/deliver/what-are-microservices) 
> _the architectural process of building a distributed application from separately deployable services that perform specific business functions and communicate over web interfaces_

![Microservices](https://learn.microsoft.com/en-us/devops/_img/microservices_600x300-1.png)

As illustrated above, this allows us to replace tightly-coupled **monolithic apps** with loosely-coupled **microservices**, breaking up complex functionality into simpler distributed components with well-defined APIs that enable remote service invocations. With this pattern, application backends can be broken down into functionally-complete parts that are owned and evolved by different teams - while delivering a reliable and cohesive application experience to users. 


## Micro-frontends

Micro-frontends is a newer term that captures the natural evolution of the microservices pattern to _frontend architectures_. Here, a 'monolithic' frontend app is _split_ into "micro-frontend" apps that are owned and evolved by potentially different teams. The core frontend application is then composed from the micro-frontends in production, as shown in this figure taken [from this 2019 article](https://martinfowler.com/articles/micro-frontends.html) that describes the pattern in more detail.

![Microfrontend Splits](https://martinfowler.com/articles/micro-frontends/deployment.png)

The key question now is: **"How do we 'split' the monolithic frontend app into micro-frontends?**. The figure below [from microfrontends.dev](https://microfrontend.dev/architecture/#patterns) illustrates the two main approaches that typically reflect team ownership of the UI/UX:

 - **Horizontal Split** (left) assumes team ownership at the level of _view components_ within a page of the application. For example: A "search micro-frontend" would now be a widget that could be embedded in different pages to activate search behaviors in context.
 - **Vertical Split** (right) assumes team ownership at the level of _page components_ within the application. For example: A "search micro-front-end" would be now be a page tied to a `/search` route, linked from other pages that pass in the query context as route params.

![Microfrontend.dev Splits](https://microfrontend.dev/images/frameworks/splits.svg)

Both options are valid - but vertical approach is the simpler to adopt, and more extensible to new requirements (with less disruption). Micro-frontends are often motivated by organizational needs, where each micro-frontend app (feature) is owned by a distinct team that manages a related product. As a best practice for micro-frontends design, **avoid horizontal teams that cut across vertical teams** as illustrated below ([source: martinfowler.com](https://martinfowler.com/articles/micro-frontends.html)) - and keep it simple.

![](https://martinfowler.com/articles/micro-frontends/horizontal.png)


## API-First Design

_API-first_ (also called _contract-first_) is the third pillar of the composable enterprise architecture. In traditional "implementation-first" approaches, the API specification is derived from the component implementation. With the "API-first" approach, the contract is defined first, decoupling the implementation (microservice) and usage (service clients) pieces - allowing different teams to own and evolve them independently. This is key to **headless** solutions and **micro-frontend** apps - both of which decouple user experience from backend implementation.

The [Open API initiative](https://learn.microsoft.com/azure/architecture/best-practices/api-design#open-api-initiative) is an industry standard for promoting such contract-first development. It comes with opinionated guidelines on API design, and a growing set of tools and libraries (e.g., "Swagger") to streamline development and documentation of your solution API. 

:::info EXPLORE THE CONTOSO REAL ESTATE OPEN API SPEC
Check out the [API](/api) link above for a peek at the Open API compliant specification (and Swagger-generated documentation) for this Contoso Real Estate reference sample.
:::

## Reference Architecture 

With this, we've completed the first step of our reference architecture design process - identifying the architecture style (composable enterprise). Now it's time to make technology choices and define the architecture iteratively, from our prioritized scenarios.

Here is a sneak peek at the final reference architecture _across all prioritized scenarios_. In the next section ([**Develop**](/develop)), we break this down into smaller scenarios, and explore the reference architecture iteratively, composing the solution one scenario at a time.

![E2E Reference Architecture For Contoso Real Estate](../../../../../assets/diagrams/e2e-full-horizontal.drawio.png)


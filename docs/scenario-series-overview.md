---
title: #Required; page title displayed in search results. Include the brand.
description: #Required; article description that is displayed in search results.
author: #Required; your GitHub user alias, with correct capitalization.
ms.author: #Required; microsoft alias of author; optional team alias.
ms.service: #Required; service per approved list. service slug assigned to your service by ACOM.
ms.topic: overview #Required
ms.date: #Required; mm/dd/yyyy format.
---

# Contoso rentals
 
Contoso Corporation is a fictional but representative global manufacturing conglomerate with its headquarters in Paris. The company deployed Microsoft 365 for enterprise and addressed major design decisions and implementation details for networking, identity, Windows 10 Enterprise, Microsoft 365 Apps for enterprise, mobile device management, information protection, and security. 

The company's overall goal for Microsoft 365 for enterprise is to accelerate its digital transformation by using cloud services to bring together its employees, partners, data, and processes to create customer value and maintain its competitive advantage in a digital-first world. 

Contoso has 3 office tiers (Headquarters, Regional and Satellite) with a total of almost 30K employees.  

![Geographical distribution of Contoso](./media/contoso-world-wide.png)

Contoso is expanding its configuration, and rolling out to new regions and countries, which will result in massive hiring. They offer relocation and have designed an application, to help HR and new hires find the right housing. This web app is an internal tool used by Contoso HR and new hire or relocating employees.  

The Contoso HR App is part of the Contoso platform and designed to serve internal users. Both authenticated Talent Managers, and new hires can interact with the application features, while non-authenticated users can access some parts of it. 

## App architecture

To support this app functionality, the Contoso engineering team decided to build the app with the following: 

* Web app with a custom domain
    * UI for blog and portal front ends
    * API layer to communicate between client and cloud
    * Microservices for cloud integrations
        * Identity for authentication and authorization
        * Storage for rental property images and rental contracts
        * Database for rental property details
        * Recommendation engine
        * Site search
        * Monitoring
        * Payments

![](./media/block-architecture.png)


## Azure architecture

To build, deploy, manage, test, and monitor this web app, Contoso selected Azure. With the help of Azure architects, the following architecture was selected.

![](./media/architecture-complete.png)

## Next steps

* Build the first iteration of the web app
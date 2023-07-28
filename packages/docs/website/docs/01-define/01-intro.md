---
slug: /define
title: The Application
description: Let's talk about Contoso Real Estate Application requirements.
---

## Background Context

[**Contoso Corporation**](https://learn.microsoft.com/en-us/microsoft-365/enterprise/contoso-overview?view=o365-worldwide) is a fictitious multi-national organization with offices worldwide employing 30K+ workers. The company is now expanding to new regions, resulting in a massive hiring push which includes relocation assistance.

The Contoso HR team has designed requirements for a **Contoso Real Estate** application that can help _New Hires_ search for and reserve housing, while allowing _Admins_ the ability to approve and feature relevant properties on the site. The application is **meant for internal use only** and must be reliable, scalable and cost-effective.

## User Types

The application has three kinds of users:
- **HR Admin** - this is a current employee of the company working in the Contoso HR organization. They are tasked with vetting the properties that are shown on the site, and writing posts that provide new hires with rental advice and recommendations.
- **New Hire** - this is a new employee going through the orientation process. They can browse the rentals portal to find rentals that meet their needs (location, amenities, price), save listings for review, and reserve their final choice with a payment.
- **Guest** - this is an anonymous visitor to the portal. Since the app can only be accessed internally, we know the visitor is a member of the organization, but not whether they are an admin, a new hire, or other employee.

## User Scenarios

Given these personas and the application objectives, the Contoso HR team identified the following user scenarios:

- A guest user should be able to visit the portal page and 
    - view a portal landing page with a navbar and footer
    - see links to About, Terms Of Service and Home pages in footer
    - see links to Login in navbar
    - click on the logo in Navbar to return to landing page at any time
    - view all available properties in the system
    - view *featured* properties (curated by an admin)
    - click on a property to see a detailed view of that property
    - login to take relevant actions (as a New Hire)


Based on their discussions, the Contoso HR team has identified the following core scenarios:
1. _CMS and Blog_. | The Contoso HR Admin must be able to curate the properties available on site, and have the ability to write blog posts with relevant advice or recommendations for new hires.
2. 


## Reference Architecture 

The reference architecture envisions the 

![E2E Reference Architecture For Contoso Real Estate](../../../../../assets/diagrams/e2e-full-horizontal.drawio.png)

## Development Environment
[![Open in GitHub Codespaces](https://github.com/codespaces/badge.svg)](https://codespaces.new/Azure-Samples/contoso-real-estate?devcontainer_path=.devcontainer/devcontainer.json)
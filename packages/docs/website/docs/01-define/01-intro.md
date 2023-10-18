---
slug: /define
title: The Application
description: Let's talk about Contoso Real Estate Application requirements.
---

## Background

[**Contoso Corporation**](https://learn.microsoft.com/en-us/microsoft-365/enterprise/contoso-overview?view=o365-worldwide) is a fictitious multi-national organization with offices worldwide employing 30K+ workers. The company is now expanding to new regions, resulting in a massive hiring push which includes relocation assistance.

The Contoso HR team has designed requirements for a **Contoso Real Estate** application that can help _New Hires_ search for and reserve housing, while allowing _Admins_ the ability to approve and feature relevant properties on the site. The application is meant for internal use only and must be **reliable, scalable and cost-effective**.

## User Roles

The application has three kinds of users (roles or personas):

- **HR Admin** - _is a current employee of the company working in the Contoso HR organization._ They are responsible for maintaining the property listings, featuring select properties, and publishing blog posts with rental advice.
- **New Hire** - _is a new employee going through the orientation process._ They can browse the rentals portal to find suitable rentals (by location, amenities, price), save listings for review, and reserve listings with a payment.
- **Guest** - _is an anonymous visitor to the portal._ Since this is an internal app, any Contoso corporation employee should be able to view listed properties in guest mode but can't take actions to save or reserve listings unless they login (activating New Hire role).

## User Experiences

From a user experience perspective, the Contoso HR team see envisions the following:

- A **portal UI** for New Hires to explore HR-approved rental listings
- A **blog UI** for New Hires to explore HR-authored blog posts
- An **admin UI** for HR Admins to manage content (for rental listings, blog posts)

The Contoso HR team takes their requirements to a solutions architect, who breaks this down into prioritized scenarios and designs the reference architecture to implement them.

---
slug: /scenarios
title: The Scenarios
description: Let's talk about Contoso Real Estate Application scenarios.
---

## App Specification

The solutions architect summarizes the requirements briefly:
 - **3 user types**: Guests, New Hires and HR Admins
 - **3 content types**: Listings, Blog Posts, User Activities
 - **3 user interfaces**: Portal UI, Blog UI and Admin UI

The use case is ideally implemented by a **modern full-stack application** with _multiple front-ends_ talking to a _content management system_ and related _service integrations_ on the backend through a _common API_. For convenience, let's label the apps (UI/UX):
 - **Admin App**: is the core UI/UX for HR Admins, putting _content management_ in focus.
 - **Portal App**: is the primary UI/UX for New Hires, putting _rental listings_ in focus.
 - **Blog App**: is the secondary UI/UX for New Hires, discoverable from the Portal App.

Where user roles are tied to the relevant app:
 - **HR Admins** are authenticated users on Admin app.
 - **New Hires** are authenticated users on Portal app.
 - **Guests** are anonymous users that can only see Blog and Portal apps.

By definition, _Guest_ roles can login on the Portal App to get upgraded to _New User_ roles. And _New User_ roles are downgraded to _Guest_ access when they log out. 

## User Scenarios

We can now convert the broad application scenario into specific user scenarios:

### 1. HR Admin Role

<details>
<summary> HR Admins can login on the Admin App </summary>

1. and _create property listings_ with location, amenities, price
2. and _update, delete, or view_ current rental listings
3. and _toggle feature flag_ on a listing to feature it
4. and _create blog posts_ with title, images, content
5. and _update portal content_ seen on about, tos, home pages.

</details>

<details>
<summary> HR Admins can't login on the Portal App </summary>

 - HR Admins credentials for Admin App should not work on Portal App.
 - HR Admin can visit the Portal App anonymously, as a Guest.

</details>

### 2. Guest Role

<details>
<summary> Guests can visit the Portal App </summary>

1. and see the *Home page* as their landing or entry point
2. and see *navbar, footer and content* sections on Home page
3. and see a clickable *login button* in the navbar 
4. and see clickable *About, TOS, Home links* in footer
5. and see a *"hero banner"* in content section of Home page 
6. and see a clickable *visit blog* button in the hero banner 
7. and see a clickable *"search" button* in content section of Home page 
8. and see a *"featured" listings block* in content section of Home page 
9. and see a clickable listing image for each item in the featured listings

</details>

<details>
<summary> Guests on the Portal App "Home" page </summary>

1. can click the *login* button to start authentication workflow
2. can click *About, TOS, Home links* to visit those pages (routes)
3. can click the search button to visit the search page to make queries
4. can click the blog link to visit the **Blog App**
5. can click a featured listing image to visit the listing details page

</details>

<details>
<summary> Guests on the Portal App "Listing Details" page </summary>

1. can see related listing images
2. can see related listing details (location, description, amenities)
3. can see a listing reservation section (not enabled for input)
4. can see the same navbar and footer sections as Home page
5. can click the navbar login button to start authentication workflow
6. can click *About, TOS, Home links* to visit those pages (routes)

</details>

<details>
<summary> Guests can visit the Blog App page </summary>

1. can see the same navbar and footer as the Portal App
1. can see a list of tags for exploring blog posts
1. can see a list of currently published blog posts 
1. can see a link to return to Portal App page
1. can click on a blog post in listing to visit Blog Article page.

</details>

### 3. New Hire Role

<details>
<summary> New Hires can login on the Portal App </summary>

1. and get all default _Guest_ features except for the login button in navbar
2. and now see a clickable _Profile_ button in navbar 
3. and now see a clickable _Favorite_ toggle button on listing cards in Home page
4. and now see a clickable _Favorite_ toggle button in Listing Detail page
5. and now see a editable _Reservation_ form section in Listing Detail page
6. and now see a clickable _Reserve_ button in Reservation form section
7. and can click Profile button to see a dropdown menu with
    - a clickable _Profile_ item leading to the user's profile page
    - a clickable _Favorites_ item leading to the user's saved listings
    - a clickable _Reservations_ item leading to the user's reservations 
    - a clickable _Payments_ item leading to the user's payments history
    - a clickable _Logout_ item that logs user out (returns to Guest role)
8. and can edit Reservation form details (dates) and click to submit request

</details>

<details>
<summary> New Hires can't login on the Admin App </summary>

 - New Hires should not _see_ any links to Admin App in Portal App
 - New Hire credentials for Portal App should not work for Admin App

</details>

Now that we have our core scenarios identified, its time to design the architecture!

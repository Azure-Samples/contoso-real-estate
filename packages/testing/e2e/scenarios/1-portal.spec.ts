import { test, expect } from "@playwright/test";
import { HomePage } from "../models/home-page";
import { DetailsPage } from "../models/details-page";
import { AboutPage } from "../models/about-page";
import { TOSPage } from "../models/tos-page";

/*
 * Test-specific config (overrides global)
 * See: https://playwright.dev/docs/api/class-testoptions
 */
test.use({
  // screenshot:'on', // 'only-on-failure',
  // video: 'on', //'retain-on-failure',
  // trace: 'on' // 'retain-on-failure',
});

/**
 * Test Hooks
 * (set state or take actions before/after each test)
 */
test.beforeEach(async ({ page }) => {
  await page.goto("/");
});
test.afterEach(async ({ page }) => {});

/**
// -----------------------------------------------
// Test Annotations:  Can help us organize testing for debugging later
// See: https://playwright.dev/docs/test-annotations
//  1. test.skip() - skip a test (=> won't run it just because you said so)
//  2. test.fail() - mark a test as failing (=> verifies it fails, else complains)
//  3. test.fixme() - mark a test as failing (=> won't run it because it's broken)
//  4. test.slow() - mark a test as slow (=> triples its test timeout)
//
// Current Usage:
//  1. We'll skip tests that are not implemented,
//  2. We'll fail them if they should not work for guest users
//     and visit later to set up conditions so they don't fail for authenticated users
//  3. We'll slow them if initial run shows timeout (so we validate test works)
//     and then refactor or skip them as needed
// ------------------------------------------------
*/

/**
 * Test Suites
 * Each `describe` is a user story for scenario 1
 * Each test is a step in the user story
 * The beforeEach hook ensures we always start at '/`.
 */

// ----- E2E Walkthrough (Skip for now) ----
test.describe("As a guest, I visit the Contoso HR Home page", () => {
  test("slow test - navigates full site", async ({ page }) => {
    test.slow();

    // 1. Set Page Object Model to match context page
    const homePage = new HomePage(page);

    // 2. Check that I'm on the right page (path)
    await homePage.isAtHome();

    // 3. Check that page layout is correct
    await homePage.hasNavBar();
    await homePage.hasHeroSection();
    await homePage.hasFooter();
    await homePage.hasFeaturedListings();

    // 4. Check that Featured Listings section is valid
    await homePage.featuredListingsHasCount(8);
    await homePage.featuredListingsHasCard();

    // 5. Check "first" Featured Listing Card contents
    await homePage.firstCardHasImage();
    await homePage.firstCardImageHasAltText("Practical loft downtown");
    await homePage.firstCardHasTitle("Practical loft downtown");
    await homePage.firstCardHasSubtitle("Hanvegib, MN");
    await homePage.firstCardHasDescription(
      "Beautiful home in a great neighborhood. This home has a large yard and is close to downtown....",
    );
    await homePage.firstCardHasPricing("£1,239.04/month");
    await homePage.firstCardHasAmenities("4 bedrooms, 2 bathrooms");
    await homePage.firstCardHasViewButton();

    // 6. Check that clickable things go places

    // TODO: Rinse-repeat #6 for every clickable thing
  });
});

// ----- New Page: /home ------
test.describe("As guest, I visit the Portal ", () => {
  test("it should have the /home route", async ({ page }) => {
    await new HomePage(page).isAtHome();
  });
  test("it should have a navbar", async ({ page }) => {
    await new HomePage(page).hasNavBar();
  });
  test("it should have a hero section", async ({ page }) => {
    await new HomePage(page).hasHeroSection();
  });
  test("it should have featured listings", async ({ page }) => {
    await new HomePage(page).hasFeaturedListings();
  });
  test("it should have a footer", async ({ page }) => {
    await new HomePage(page).hasFooter();
  });
});

test.describe("As guest, I view the Featured Listings", () => {
  test("it should have 8 featured listings", async ({ page }) => {
    await new HomePage(page).featuredListingsHasCount(8);
  });
  test("the featured listing has a card", async ({ page }) => {
    await new HomePage(page).featuredListingsHasCard();
  });
});

test.describe("As guest, I can view Featured Listing details in card", () => {
  test("it should have an image", async ({ page }) => {
    await new HomePage(page).firstCardHasImage();
  });
  test("the image should have alt text", async ({ page }) => {
    await new HomePage(page).firstCardImageHasAltText("Practical loft downtown");
  });
  test("it should have a title", async ({ page }) => {
    await new HomePage(page).firstCardHasTitle("Practical loft downtown");
  });
  test("it should have a subtitle", async ({ page }) => {
    await new HomePage(page).firstCardHasSubtitle("Hanvegib, MN");
  });
  test("it should have a description", async ({ page }) => {
    await new HomePage(page).firstCardHasDescription(
      "Beautiful home in a great neighborhood. This home has a large yard and is close to downtown....",
    );
  });
  test("it should have pricing", async ({ page }) => {
    await new HomePage(page).firstCardHasPricing("£1,239.04/month");
  });
  test("it should have amenities", async ({ page }) => {
    await new HomePage(page).firstCardHasAmenities("4 bedrooms, 2 bathrooms");
  });
  test("it should have a 'View Listing' button", async ({ page }) => {
    await new HomePage(page).firstCardHasViewButton();
  });
});

test.describe("As guest, I click View Listings to see Details Page", () => {
  test.skip("to be implemented", async ({ page }) => {});
});

test.describe('As guest, I click the "Browse Listings" button', () => {
  test.skip("to be implemented", async ({ page }) => {});
});

test.describe('As guest, I click the "Visit our blog" button', () => {
  test.skip("to be implemented", async ({ page }) => {});
});

test.describe('As guest, I click the "Home" link in footer', () => {
  test.skip("to be implemented", async ({ page }) => {});
});

test.describe('As guest, I click the "About" link in footer', () => {
  test.skip("to be implemented", async ({ page }) => {});
});

test.describe('As guest, I click the "Terms of Service" link in footer', () => {
  test.skip("to be implemented", async ({ page }) => {});
});

test.describe('As guest, I click the "Logo" in footer', () => {
  test.skip("to be implemented", async ({ page }) => {});
});

test.describe('As guest, I click the "Logo" in navbar', () => {
  test.skip("to be implemented", async ({ page }) => {});
});

test.describe('As guest, I click the "Logo" in hero section', () => {
  test.skip("to be implemented", async ({ page }) => {});
});

test.describe('As guest, I click the "Welcome, Guest" in navbar', () => {
  test.skip("to be implemented", async ({ page }) => {});
});

test.describe('As guest, I click the "login" in dropdown menu', () => {
  test.skip("to be implemented", async ({ page }) => {});
});

// ------ New Page: /listing/{id} ------
test.describe("As guest, I visit a Listing Details page", () => {
  test.skip("to be implemented", async ({ page }) => {});
});

// ------ New Page: /about ------
test.describe("As guest, I visit the About page", () => {
  test.skip("to be implemented", async ({ page }) => {});
});

// ------ New Page: /tos  ------
test.describe("As guest, I visit the Terms Of Service page", () => {
  test.skip("to be implemented", async ({ page }) => {});
});

// ------ New Page: /auth/login ------
test.describe("As guest, I visit the Auth Login page", () => {
  test.skip("to be implemented", async ({ page }) => {});
});

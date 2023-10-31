import { expect, Locator, Page } from "@playwright/test";

// Page Object Model defined for every "route"
// With focus on sub-component related to route topic
// Example: Payments = Profile Page set to Payments tab
import { AboutPage } from "./about-page";
import { AuthPage } from "./auth-page";
import { BlogPage } from "./blog-page";
import { DetailsPage } from "./details-page";
import { FavoritesPage } from "./favorites-page";
import { PaymentPage } from "./payment-page";
import { ProfilePage } from "./profile-page";
import { ReservationsPage } from "./reservations-page";
import { TOSPage } from "./tos-page";

/**
 * Page Object Model does three things for us:
 *  1. Constructs "custom" page objects from the underlying Playwright Page fixture
 *  2. We can add custom (user-understandable) methods *and reuse* them across tests
 *  3. This *abstracts implementation* of methods from usage (allowing for refactoring)
 *
 * A good example for #3 is with locators used for testing.
 *  1. Initial locators may be sub-optimal (refactor without rewriting tests)
 *  2. Page implementations may change
 *  3. Locators may cause errors (we can centralize fixes for all tests in one place)
 *
 * Locate (resolve uniquely) all your page elements.
 *  1. Use Playwright extension `Pick Locators` to get a first-pass at locators
 *     See: https://playwright.dev/docs/getting-started-vscode#picking-a-locator
 *  2. Prefer built-in locators like `page.getByRole()` over `page.locator()`
 *     See: https://playwright.dev/docs/locators
 *  3. Understand ARIA roles and attributes to use with `page.getByRole()`
 *     See: https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles
 *     See: https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes
 *  4. Set `data-testid` attributes and `page.getByTestId()` if built-in locators don't work
 *     See: https://playwright.dev/docs/selectors#data-testid-attributes
 *     Note: //FIXME are reminders to set data-testid attributes & refactor
 *           In real-world usage, define testid attributes during design phase
 *  5. Use `page.locator()` with CSS or XPath only if built-in locators don't work
 *     See: https://playwright.dev/docs/other-locators#css-locator
 *     See: https://www.w3schools.com/cssref/css_selectors.php
 *  6. Use `page.frameLocator` to locate elements in iframes
 *     See: https://playwright.dev/docs/frames
 *
 * Debugging selectors used in locators:
 *  1. Use Playwright Inspector
 *     See: https://playwright.dev/docs/debug-selectors#using-playwright-inspector
 *  2. Using DevTools
 *     See: https://playwright.dev/docs/debug-selectors#using-devtools
 *  3. Use Verbose API Logs
 *     See: https://playwright.dev/docs/debug-selectors#verbose-api-logs
 *  4. Use `Pick Locator` in VS Code Extension
 *     See: https://playwright.dev/docs/getting-started-vscode#picking-a-locator
 *
 * Once you have a locator you can take specific actions on it.
 *  1. Interactive inputs e.g., `click()`, `fill()`, `check()`, `uncheck()`, `selectOption()`
 *     See: https://playwright.dev/docs/input
 *  2. Navigation
 *     See: https://playwright.dev/docs/navigations
 */

export class HomePage {
  // ------------- visitable pages (Page Object Models)
  // We don't need to define all of these, since they
  // need to be constructed on demand (around active page)
  // but keeping them here for now just to validate import
  // once we finish all tests below, we can remove them here
  // (they will be declared and used within the methods)
  readonly homePage: HomePage;
  readonly tosPage: TOSPage;
  readonly aboutPage: AboutPage;
  readonly blogPage: BlogPage;
  readonly detailsPage: DetailsPage;
  readonly authPage: AuthPage;
  readonly profilePage: ProfilePage;
  readonly favoritesPage: FavoritesPage;
  readonly reservationsPage: ReservationsPage;
  readonly paymentsPage: PaymentPage;
  // --------------------------------------------------

  // ------------- The Playwright Page fixture (POM base)
  readonly page: Page;
  readonly path: string = "/home";

  // ------------- Navbar
  readonly navLogo: Locator;
  readonly navAuth: Locator;

  // ------------- hero section
  readonly heroLogo: Locator;
  readonly heroTitle: Locator;
  readonly heroSubtitle: Locator;
  readonly heroListingsButton: Locator;
  readonly heroBlogLink: Locator;

  // ------------- auth section
  readonly authDropdown: Locator;
  readonly guestLoginLink: Locator;
  readonly userHomeLink: Locator;
  readonly userProfileLink: Locator;
  readonly userFavoritesLink: Locator;
  readonly userPaymentsLink: Locator;
  readonly userReservationsLink: Locator;
  readonly userLogoutLink: Locator;

  // ------------- footer section
  readonly footerLogo: Locator;
  readonly footerHomeLink: Locator;
  readonly footerAboutLink: Locator;
  readonly footerTOSLink: Locator;
  readonly footerCopyright: Locator;

  // ------------- featured listings section
  readonly featuredTitle: Locator;
  readonly featuredListings: Locator;

  // ------------- first featured listing card
  readonly firstListingsCard: Locator;
  readonly firstListingsCardImage: Locator;
  readonly firstListingsCardTitle: Locator;
  readonly firstListingsCardSubtitle: Locator;
  readonly firstListingsCardDescription: Locator;
  readonly firstListingsCardViewButton: Locator;
  readonly firstListingsCardSaveButton: Locator;
  readonly firstListingsCardPricing: Locator;
  readonly firstListingsCardAmenities: Locator;

  /*
   * ======================================
   * Page Object Model for HomePage
   * located at "/home"
   * @param page
   * ======================================
   */
  constructor(page: Page) {
    this.page = page;

    // ------------- Navbar
    // navLogo, navAuth
    // --------------------------------------------------

    this.navLogo = page
      .locator("mat-toolbar") // FIXME: data-testid="nav"
      .getByRole("link", { name: "Contoso Rentals" });

    this.navAuth = page.getByRole("button", {
      name: "User profile menu",
    });

    // ------------- hero section
    // heroLogo, heroTitle, heroSubtitle,
    // heroListingsButton, heroBlogLink
    // --------------------------------------------------

    this.heroLogo = page
      .locator(".stage") //FIXME: data-testid="hero-logo"
      .locator("img");

    this.heroTitle = page.getByRole("heading", {
      name: "Welcome to Contoso Real Estate",
    });

    this.heroSubtitle = page.getByText(
      "The Contoso Portal is a place where you can find all the information you need to",
    );

    this.heroListingsButton = page.getByRole("link", {
      name: "Browse listings",
    });

    this.heroBlogLink = page.getByRole("link", { name: "Visit our blog" });

    // ------------- auth section
    // authDropdown,
    // guestLoginLink,
    // userHomeLink, userProfileLink, userFavoritesLink,
    // userPaymentsLink, userReservationsLink, userLogoutLink
    // --------------------------------------------------
    this.authDropdown = page.getByRole("button", { name: "User profile menu" });
    this.guestLoginLink = page.getByRole("menuitem", { name: "Login" });
    this.userHomeLink = page.getByRole("menuitem", { name: "Home" });
    this.userProfileLink = page.getByRole("menuitem", { name: "Profile" });
    this.userFavoritesLink = page.getByRole("menuitem", { name: "Favorites" });
    this.userPaymentsLink = page.getByRole("menuitem", { name: "Payments" });
    this.userReservationsLink = page.getByRole("menuitem", {
      name: "Reservations",
    });
    this.userLogoutLink = page.getByRole("menuitem", { name: "Logout" });

    // -------------- footer section
    // footerLogo,
    // footerHomeLink, footerAboutLink, footerTOSLink,
    // footerCopyright
    // -----------------------
    this.footerLogo = page.getByRole("contentinfo").getByRole("link", { name: "Contoso Rentals" });
    this.footerAboutLink = page.getByRole("link", { name: "About" });
    this.footerHomeLink = page.getByRole("link", { name: "Home" });
    this.footerTOSLink = page.getByRole("link", { name: "Terms of Service" });
    this.footerCopyright = page.getByText("©2023 - JavaScript @ Contoso HR Rentals App");

    // ------------- featured listings section
    // featuredListingsTitle, featuredListingsList
    // --------------------------------------------------
    this.featuredTitle = page.getByRole("heading", {
      name: "Featured Listings",
    });
    this.featuredListings = page.getByRole("list");

    // ------------- first featured listing card
    // firstListingsCard, firstListingsCardImage,
    // firstListingsCardTitle, firstListingsCardSubtitle,
    // firstListingsCardDescription, firstListingsCardViewButton,
    // firstListingsCardSaveButton, firstListingsCardPricing,
    // firstListingsCardAmenities
    // --------------------------------------------------

    // FIXME: These need to be refactored to use the data-testid attribute
    // or use Playwright-specific CSS locator guidance at:
    // https://playwright.dev/docs/other-locators#css-locator
    this.firstListingsCard = this.featuredListings.locator("mat-card").locator("nth=0");
    this.firstListingsCardImage = this.firstListingsCard.getByRole("img");
    this.firstListingsCardTitle = this.firstListingsCard.locator("mat-card-content > mat-card-title");
    this.firstListingsCardSubtitle = this.firstListingsCard.locator("mat-card-content > mat-card-subtitle");
    this.firstListingsCardDescription = this.firstListingsCard.locator("mat-card-content > p");
    this.firstListingsCardViewButton = this.firstListingsCard.getByRole("link", { name: "View listing" });
    this.firstListingsCardPricing = this.firstListingsCard.locator("mat-card-actions h2");
    this.firstListingsCardAmenities = this.firstListingsCard.locator("mat-card-actions h5");
    this.firstListingsCardSaveButton = this.firstListingsCard.locator("app-favorite-button button");

    // ------------- visitable pages
    // HomePage, TOSPage, AboutPage, BlogPage, ListingsPage
    // --------------------------------------------------
  }

  /** --------------------- ACTIONS ---------------------
   * Define actions on the page using located elements
   * Based on intent, the action can
   *  simply change state = await only OR
   *  it can change state and verify the change = await+expect
   * ----------------------------------------------------
   */

  // Visit Home Page
  async goto() {
    await this.page.goto(this.path);
  }

  // Validate Home Page has the correct path for Page Object Model
  async isAtHome() {
    expect(this.page.url().endsWith(this.path));
  }

  // ----- EXISTENCE CHECKS: TOP LEVEL ----------------
  async hasNavBar() {
    await expect(this.navLogo).toBeVisible();
    await expect(this.navAuth).toBeVisible();
  }
  async hasHeroSection() {
    await expect(this.heroLogo).toBeVisible();
    await expect(this.heroTitle).toBeVisible();
    await expect(this.heroSubtitle).toBeVisible();
    await expect(this.heroListingsButton).toBeVisible();
    await expect(this.heroBlogLink).toBeVisible();
  }
  async hasFeaturedListings() {
    await expect(this.featuredTitle).toBeVisible();
    await expect(this.featuredListings).toBeVisible();
  }
  async hasFooter() {
    await expect(this.footerAboutLink).toBeVisible();
    await expect(this.footerHomeLink).toBeVisible();
    await expect(this.footerTOSLink).toBeVisible();
    await expect(this.footerLogo).toBeVisible();
    await expect(this.footerCopyright).toBeVisible();
  }

  // ----- EXISTENCE CHECKS: SECOND LEVEL  ----------

  async featuredListingsHasCount(num: number) {
    await expect(this.featuredListings.locator("mat-card")).toHaveCount(num);
  }

  async featuredListingsHasCard() {
    await expect(this.firstListingsCard).toBeVisible();
  }

  async firstCardHasTitle(title: string) {
    await expect(this.firstListingsCardTitle).toHaveText(title);
  }
  async firstCardHasSubtitle(subtitle: string) {
    await expect(this.firstListingsCardSubtitle).toHaveText(subtitle);
  }

  async firstCardHasImage() {
    await expect(this.firstListingsCardImage).toBeVisible();
  }

  async firstCardImageHasAltText(altText: string) {
    await expect(this.firstListingsCardImage).toHaveAttribute("alt", altText);
  }

  async firstCardHasDescription(description: string) {
    await expect(this.firstListingsCardDescription).toHaveText(description);
  }

  async firstCardHasPricing(pricing: string) {
    await expect(this.firstListingsCardPricing).toHaveText(pricing);
  }

  async firstCardHasAmenities(amenities: string) {
    await expect(this.firstListingsCardAmenities).toHaveText(amenities);
  }

  async firstCardHasViewButton() {
    await expect(this.firstListingsCardViewButton).toBeVisible();
  }
}

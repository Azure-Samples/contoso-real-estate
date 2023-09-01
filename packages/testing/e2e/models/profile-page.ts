import { expect, Locator, Page } from "@playwright/test";

export class ProfilePage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  // Go to this page
  async goto() {
    await this.page.goto("/me");
  }

  // Validate we are at "/me"
  async isAtProfile() {
    expect(this.page.url()).toBe(process.env.PROD_EP + "me");
  }
}

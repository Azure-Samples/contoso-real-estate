import { expect, Locator, Page } from "@playwright/test";
import { CONFIG } from "../config";

export class ProfilePage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  // Go to this page
  async goto() {
    await this.page.goto(CONFIG.BASE_URL + "/me");
  }

  // Validate we are at "/me"
  async isAtProfile() {
    expect(this.page.url()).toBe(CONFIG.BASE_URL + "me");
  }
}

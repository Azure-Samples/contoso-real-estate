import { expect, Locator, Page } from "@playwright/test";
import { CONFIG } from "../config";
export class AboutPage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  // Validate we are at "/about"
  async isAtAbout() {
    expect(this.page.url()).toBe(CONFIG.BASE_URL + "/about");
  }
}

import { expect, Locator, Page } from "@playwright/test";
import { CONFIG } from "../config";

export class AuthPage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  // Go to this page
  async goto() {
    await this.page.goto(CONFIG.BASE_URL + "/auth/login");
  }
}

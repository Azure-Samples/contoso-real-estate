import { expect, Locator, Page } from "@playwright/test";
import { CONFIG } from "../config";

export class BlogPage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  // Go to this page
  async goto() {
    await this.page.goto(CONFIG.BASE_URL + "/blog");
  }

  // Validate we are at "/blog"
  async isAtBlog() {
    expect(this.page.url()).toBe(CONFIG.BASE_URL + "blog");
  }
}

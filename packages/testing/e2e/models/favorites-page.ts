import { expect, Locator, Page } from "@playwright/test";
import { CONFIG } from "../config";
export class FavoritesPage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  // Go to this page
  async goto(id: string) {
    await this.page.goto(CONFIG.BASE_URL + "/me/favorites");
  }
}

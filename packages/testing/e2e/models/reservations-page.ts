import { expect, Locator, Page } from "@playwright/test";
import { CONFIG } from "../config";
export class ReservationsPage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  // Go to this page
  async goto() {
    await this.page.goto(CONFIG.BASE_URL + "/me/reservations");
  }

  // Validate we are at "/me/payments"
  async isAtHome() {
    expect(this.page.url()).toBe(CONFIG.BASE_URL + ",me/payments");
  }
}

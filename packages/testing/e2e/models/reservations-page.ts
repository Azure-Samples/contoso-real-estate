import { expect, Locator, Page }
from '@playwright/test';

export class ReservationsPage {

    readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    // Go to this page
    async goto(){
        await this.page.goto('/me/reservations');
    }

    // Validate we are at "/me/payments"
    async isAtHome(){
        expect (this.page.url()).toBe(process.env.PROD_EP+',me/payments');
    }
}
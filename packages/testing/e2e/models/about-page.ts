import { expect, Locator, Page } from '@playwright/test';
export class AboutPage {

    readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    // Validate we are at "/about"
    async isAtAbout(){
        expect (this.page.url()).toBe(process.env.PROD_EP+'about');
    }

}
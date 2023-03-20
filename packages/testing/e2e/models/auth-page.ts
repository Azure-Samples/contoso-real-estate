import { expect, Locator, Page }
from '@playwright/test';

export class AuthPage {

    readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    // Go to this page
    async goto(){
        await this.page.goto('/auth/login');
    }
}
import { expect, Locator, Page }
from '@playwright/test';

export class BlogPage {

    readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    // Go to this page
    async goto(){
        await this.page.goto('/blog');
    }

    // Validate we are at "/blog"
    async isAtBlog(){
        expect (this.page.url()).toBe(process.env.PROD_EP+'blog');
    }
}
import { expect, Locator, Page }
from '@playwright/test';

export class DetailsPage {

    readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    // Go to this page
    async goto(id: string){
        await this.page.goto('/listing/'+id);
    }
}
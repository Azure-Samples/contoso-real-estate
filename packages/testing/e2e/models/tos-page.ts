import { expect, Locator, Page }
from '@playwright/test';

export class TOSPage {

    readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }
}
import { test, expect } from '@playwright/test';

// Here, "/" maps to the BASE_URL defined in playwright.config.ts "use"
// Other routes can thus be mapped to relative paths from BASE_URL

test('homepage has VISIBLE "Developer Guide" title in banner', async ({ page }) => {

  await page.goto('/');
  await page.getByRole('heading', { name: '/Developer Guide/' })
        .isVisible();
});

test('homepage has CLICKABLE "Explore The Guide" link in banner', async ({ page }) => {  
  
  // Go to the default BASE_URL (referenced by "/")
  await page.goto('/');
  await page.getByRole('link', { name: 'Explore The Guide 🔎' })
        .isVisible();

});

test('clicking "Explore The Guide" link in banner takes us elsewhere', async ({ page }) => {  
  
  // Go to the default BASE_URL (referenced by "/")
  await page.goto('/');
  await page.getByRole('link', { name: 'Explore The Guide 🔎' })
        .click();
  await expect(page).toHaveURL('/intro');

});


test('site has a VALID /api route with specified banner title', async ({ page }) => {  
  
  // Go to the default BASE_URL (referenced by "/")
  await page.goto('/api');
  await page.getByRole('heading', { name: '/Contoso Real Estate API/' })
        .isVisible();
});
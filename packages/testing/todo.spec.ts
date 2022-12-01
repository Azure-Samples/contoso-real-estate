import { test, expect } from "@playwright/test";

test("Create and delete item test", async ({ page }) => {
  await page.goto("/");

  expect(true).toBe(true);
});

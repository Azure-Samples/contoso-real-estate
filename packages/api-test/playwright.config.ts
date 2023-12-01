import { defineConfig, devices } from '@playwright/test';

// create base URL from 3 sources:
// 1. SERVICE_API_ENDPOINTS - set by GitHub Actions
// 2. CODESPACE_NAME - set by GitHub Codespaces
// 3. localhost:7071 - default
// const BASE_URL = process.env.SERVICE_API_ENDPOINTS && process.env.SERVICE_API_ENDPOINTS[0]
//   ? process.env.SERVICE_API_ENDPOINTS[0]
//   : process.env.CODESPACE_NAME
//     ? `https://${process.env.CODESPACE_NAME}-${process.env.CODESPACE_PORT}.githubpreview.dev`
//     : 'http://localhost:7072';

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// require('dotenv').config();

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
  testDir: './tests',

  /* Maximum time one test can run for. */
  timeout: 30 * 1000,

  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,

  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,

  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : undefined,

  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: 'html',

  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    /* Base URL to use in actions like `await page.goto('/')`. */
    // baseURL: BASE_URL,

    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: 'on-first-retry',
  },
});

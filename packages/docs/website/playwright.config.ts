import { defineConfig, devices } from '@playwright/test';

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 * Use: console.log(process.env)
 *   after require, to see all env variables.
 */
require('dotenv').config();

/**
 * See Test Configuration docs for all options:
 * https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({

  testDir: './tests',

  timeout: parseInt(process.env.TIMEOUT) || 30000 ,
  expect: { timeout: parseInt(process.env.TIMEOUT_EXPECT) || 5000 },
  
  // See: Parallelization & Sharding docs
  // https://playwright.dev/docs/test-parallel
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,

  reporter: 'html',
  
  use: {
    baseURL: process.env.BASE_URL || process.env.DEVSRV_URL || 'http://localhost:3000',
    trace: 'on-first-retry',
  },

  // See: Configure Projects For Multiple Browsers
  // https://playwright.dev/docs/test-projects
  projects: [

    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },
    {
      name: 'Mobile Chrome',
      use: { ...devices['Pixel 5'] },
    },
  ],

  /* Run local dev server before starting the tests  */
  webServer: {
    command: 'npm run start',    // 'npm run build && npm run serve',
    url: process.DEVSRV_URL || 'http://localhost:3000',
    reuseExistingServer: !process.env.CI,
    timeout: 120 * 1000,
    stderr: 'pipe', // 'pipe' | 'ignore'
    stdout: 'pipe', // 'pipe' | 'ignore'
  },
});

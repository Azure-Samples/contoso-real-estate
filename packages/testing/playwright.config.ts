import { PlaywrightTestConfig } from "@playwright/test";
import devices from "@playwright/test";
import fs from "fs";
import { join } from "path";
import dotenv from "dotenv";

/**
 * See https://playwright.dev/docs/test-configuration.
 */
const config: PlaywrightTestConfig = {
  testDir: ".",
  /* Maximum time one test can run for. */
  timeout: 240 * 1000,
  expect: {
    /**
     * Maximum time expect() should wait for the condition to be met.
     * For example in `await expect(locator).toHaveText();`
     */
    timeout: 5000,
  },
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : undefined,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: "html",
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    /* Maximum time each action such as `click()` can take. Defaults to 0 (no limit). */
    actionTimeout: 0,
    /* Base URL to use in actions like `await page.goto('/')`. */
    baseURL: getBaseURL(),

    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: "on-first-retry",
  },

  /* Configure projects for major browsers */
  projects: [
    {
      name: "chromium",
      use: {
        ...(devices as any)["Desktop Chrome"],
      },
    },
  ],
};

function getBaseURL() {
  // If we don't have URL and aren't in CI, then try to load from environment
  if (!process.env.REACT_APP_WEB_BASE_URL && !process.env.CI) {
    // Try to get env in .azure folder
    let environment = process.env.AZURE_ENV_NAME;
    if (!environment) {
      // Couldn't find env name in env var, let's try to load from .azure folder
      try {
        let configfilePath = join(__dirname, "..", ".azure", "config.json");
        if (fs.existsSync(configfilePath)) {
          let configFile = JSON.parse(fs.readFileSync(configfilePath, "utf-8"));
          environment = configFile["defaultEnvironment"];
        }
      } catch (err) {
        console.log("Unable to load default environment: " + err);
      }
    }

    if (environment) {
      let envPath = join(__dirname, "..", ".azure", environment, ".env");
      console.log("Loading env from: " + envPath);
      dotenv.config({ path: envPath });
      return process.env.REACT_APP_WEB_BASE_URL;
    }
  }

  let baseURL = process.env.REACT_APP_WEB_BASE_URL || "http://localhost:3000";
  console.log("baseUrl: " + baseURL);
  return baseURL;
}

export default config;

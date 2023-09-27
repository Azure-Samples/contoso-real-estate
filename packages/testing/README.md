# End-to-End Testing With Playwright

This document will guide you through the process of setting up a new Playwright test project, and authoring and running end-to-end tests for the Contoso web application.

## 1. Prerequisites

- [VS Code](https://code.visualstudio.com/) - we are using VS Code for this tutorial as the recommended option. However, you can use any editor of your choice for _authoring_ tests.
- [VS Code Extension For Playwright](https://marketplace.visualstudio.com/items?itemName=ms-playwright.playwright) - provides a first-class experience for authoring, debugging and running Playwright tests in VS Code.
- [Node.js](https://nodejs.org/en/) v16 or later and [npm](https://www.npmjs.com/) v8 or later. We recommend using [nvm](https://github.com/nvm-sh/nvm) for managing multiple Node.js versions on your machine seamlessly

## 2. Setup

The Playwright testing harness can be found in the `packages/testing` folder. This has already been setup for you, so skip to the next section unless you want to know more about the setup process.

### 2.1 Playwright Installation

To set up Playwright we followed the [Installing Playwright](https://playwright.dev/docs/intro#installing-playwright) guidelines. Here is what our setup choices looked like:

```bash
$ npm init playwright@latest

Getting started with writing end-to-end tests with Playwright:
Initializing project in '.'
✔ Do you want to use TypeScript or JavaScript? · TypeScript
✔ Where to put your end-to-end tests? · e2e
✔ Add a GitHub Actions workflow? (y/N) · false
✔ Install Playwright browsers (can be done manually via 'npx playwright install')? (Y/n) · true
```

### 2.2 Adding `dotenv` support

We want to use environment variables for dynamic configuration (e.g., switch between local and production environments). The [recommended approach](https://playwright.dev/docs/test-configuration#environment-variables) is to use the [dotenv package with .env files](https://playwright.dev/docs/test-parameterize#env-files).

The `playwright.config.ts` has a setting for this. Simply uncomment the `require` line to activate usage and add your environment variables to `.env` (default file).

```js
/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// require('dotenv').config();
```

You can now access the environment variables using `process.env` and use them to [set test options](https://playwright.dev/docs/api/class-testoptions) at project or test (all projects) levels.

- _Example_: [baseURL](https://playwright.dev/docs/api/class-testoptions#test-options-base-url) is set to `process.env.BASE_URL`, influencing `page.goto()` requests globally.

## 3. Project Structure

The default scaffold comes with a sample test specification and a full-fledged todo example. We removed both, and added our own test specifications instead. You should see the following files:

```bash
.env              - environment variables using dotenv
.gitignore        - ignores Playwright test artifacts
README.md         - this file
e2e/              - top-level folder for all e2e test specs
package-lock.json - lock file for npm
package.json      - npm configuration for the project
```

The `e2e` folder is the default `testDir` location defined in `playwright.config.ts`. The Playwright Test Runner will search this folder _recursively_ for tests specfications. Use this to organize tests better (e.g., `e2e/scenarios` for scenario testing specifications, and `e2e/api` for contract testing specifications).

## 4. Running E2E Tests

Simply run the Playwright Test Runner from the root of the project. It will automatically run all tests found (recursively) in the `e2e` folder, in order.

```bash
$ npx playwright test
```

## 5. Viewing Test Reports

The Playwright Test Runner will generate an 'html' report for each test run in the `playwright-report` folder by default. It should launch the browser to show the report automatically. You can also inspect the report manually with this command:

```bash
$ npx playwright show-report
```

## 6. Viewing Test Artifacts

The Playwright Test Runner may generate other test artifacts based on configuration. For example: [TestOptions](https://playwright.dev/docs/api/class-testoptions) for `screenshot`, `video`, and `trace` can generate {.png, .webm and .zip} artifact files.

The destination folder is configured by `outputDir` and defaults to `test-results/`. Artifacts for each test project go into a deterministically-named subfolder below.
Note: This directory contains _raw_ test artifacts. By contrast the _playwright-report_ directory contains _formatted_ results for the given reporter.

---

## 6. Advanced Topics

---

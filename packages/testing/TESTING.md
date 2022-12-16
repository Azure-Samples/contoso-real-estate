# End-to-End Testing With Playwright

[Playwright](https://playwright.dev) is used for end-to-end testing of the Contoso Rentals App. This file documents, setup and decision-making behind the E2E Testing strategy.

----

## E2E Testing in a Monorepo

This section documents our decision making process for how the e2e testing harness is setup in the monorepo context. There are a number of considerations:
 - What are the dependencies between workspaces
 - When should the tests be run (per commit, or nightly)
 - How should tests be run (local dev vs. CI/CD automation)
 - What should the tests run on (dev env vs. deploy env)

> INITIAL THINKING

 - Root 'package.json' will have an `e2e-tests` script 
    - Should trigger end-to-end testing using Playwright directly (now)
    - Should trigger similarly named tests across all workspaces (later)
 - Playwright Configuration
    - _Initially_: Setup Playwright at the root of the monorepo, with configured "webserver" that runs local dev server for testing.
    - _Later_: Refactor to move tests into a standalone testing package that can be run in CI/CD, and run against a deployed endpoint OR with prior step that manually starts a local dev server.
 - Playwright Test Specification
    - _Initially_: Setup a single specification file that runs various tests organized into test suites.
    - _Later_: Split up tests into separate script files, allowing more flexibility in configuring test parameters (overriding global config) to suit context
 

---

## E2E Testing Specification

This section documents the E2E user scenarios covered by the testing. The initial focus is on E2E testing of the Portal App.

> SCENARIO 1: GUEST EXPERIENCE

 1. The Guest visits: the Portal App landing page
    - using a direct fully-qualified URL
    - clicking on the navbar logo from any page
 2. The Guest sees: on the landing page
    - a list of Featured Rental properties where 
        - each property has [details]
        - each property has a clickable [button]
    - a footer containing links to 
        - Home
        - Terms of Service
        - About
    - a navigation bar containing 
        - Guest Profile card
 3. The Guest visits: the Home page
    - by entering the path "/home"
    - by clicking the "Home" link in the footer
 4. The Guest visits: the About page
    - by entering the path "/about"
    - by clicking the "About" link in the footer
 5. The Guest visits: the TOS page
    - by entering the path "/tos"
    - by clicking the "TOS" link in the footer
 6. The Guest clicks on: the "View Listing" button for card with [slug]
    - is taken to a Listing Details page with route "/listings/[slug]'
 7. The Guest sees: on the Listing Details page
    - each property has [photos]
    - each property has []
 8. The Guest clicks on: the Guest Profile Icon
    - sees a drop-down menu with [Options]
 9 The Guest clicks on: the [ ] Option
    - is taken to a [ ] page

> SCENARIO 4: AUTHENTICATING THE GUEST

This section will be updated once the specification is finalized.

> SCENARIO 1: AUTHENTICATED USER EXPERIENCE

This section will be updated once the specification is finalized, after Scenario 4 is completed.

---
#  Playwright Implementation

## 1. Setup

Initialize Playwright using the command below. 

```
$ npm init playwright@latest
```

Note that we are opting _NOT_ to install default browsers or setup GitHub Actions at this stage (see below). And we're configuring `e2e-tests` as the default location for all test specifications (scripts).

```
Need to install the following packages:
  create-playwright@1.17.124
Ok to proceed? (y) 
Getting started with writing end-to-end tests with Playwright:
Initializing project in '.'
✔ Where to put yoxur end-to-end tests? · e2e-tests
✔ Add a GitHub Actions workflow? (y/N) · false
✔ Install Playwright browsers (can be done manually via 'npx playwright install')? (Y/n) · false
```

The setup creates the following files:

```
  - ./e2e-tests/example.spec.ts - Example end-to-end test
  - ./tests-examples/demo-todo-app.spec.ts - Demo Todo App end-to-end tests
  - ./playwright.config.ts - Playwright Test configuration
```
It also adds a `.gitignore` to prevent test run report/output files from being checked in inadvertently. _Note: If you change the Playwright configuration to use a different output folder for your test reports, make sure to update the `.gitignore` accordingly_.

We'll go ahead and delete the `tests-examples/` directory (demo) and focus on customizing the configuration file before updating the example script for our needs.

---

## 2. Playwright DevTools

Playwright comes with a CLI that you can use to run tests - or to author, debug, and profile them - using the commands below:

```
  npx playwright test
    Runs the end-to-end tests.

  npx playwright test --project=chromium
    Runs the tests only on Desktop Chrome.

  npx playwright test example
    Runs the tests in a specific file.

  npx playwright test --debug
    Runs the tests in debug mode.

  npx playwright codegen
    Auto generate tests with Codegen.
```

You can also use the Playwright CLI to capture page screenshots, view execution traces, save pages as PDF, view HTML reports of test runs and more. Learn about available commands and options by using the help command.

```
npx playwright --help
``` 

---

## 3. Running Tests

Since we did _not_ install the browsers by default, we need to use the following command to ensure dependencies are installed before invoking the Playwright Test Runner:

```
$ npx playwright install --with-deps && npx playwright test
```

Let's update the `package.json` file in the root of the monorepo to add an `e2e-tests` script that does this for us.

```json
  "scripts": {
    ...
    "e2e-tests": "npx playwright install --with-deps && npx playwright test",
    ...
  },
```

With this in mind, the _recommended_ way to run e2e tests in this monorepo is:

```
$ npm run e2e-tests
```

Later, when we refactor tests, we can use the command at the root to trigger the command consistently across _all_ workspaces, to run local test scripts per package.

---

## 4. Configuring Tests

Playwright can be configured at two levels:

1. _Globally_ in [`playwright.config.ts`](./playwright.config.ts) - across all tests.
2. _Local Overrides_ in spec (e.g., [example.spec.ts](./e2e-tests/example.spec.ts)) for that test.

Configuration is done using [**TestOptions**](https://playwright.dev/docs/api/class-testoptions) (for test env) using: 
 - [testConfig.use](https://playwright.dev/docs/api/class-testconfig#test-config-use) in _global config_ for all tests
 - [testProject.use](https://playwright.dev/docs/api/class-testproject#test-project-use) in _global config_ for all tests in project
 - [test.use](https://playwright.dev/docs/api/class-test#test-use) in _local config_ to override global settings

> Initial Config Changes

We'll start with some basic changes to support running tests in local env:
 * change  `trace:'on-first-retry'` to `trace: 'on'` => generates traces always
 * comment out all projects except `chromium` => limit testing to one browser/device.
 * configure the `webserver` to run the local devserver with `swa`

 ```
   webServer: {
    command: 'npm run build && npm run start',
    port: 4280,
    timeout: 120 * 1000,
    reuseExistingServer: !process.env.CI,
  },
 ```

 > Initial Script Changes

 Let's change the example script to run a simple test that verifies the Portal App is running on local dev server, shows a landing page with a specific title and link, and routes to a specific (new) page when the link is clicked.

 ```
test('Portal App loads, links to /about', async ({ page }) => {
  await page.goto('http://localhost:4280');
  await expect(page).toHaveTitle(/ContosoApp/);
  const getStarted = page.getByRole('link', { name: 'About' });
  await expect(getStarted).toHaveAttribute('href', '/about');
  await getStarted.click();
  await expect(page).toHaveURL(/about/);
});
 ```

---

## 5. Validing Configuration

Let's run the sample test with the new configuration. 

```
$ npm run e2e-tests

> contoso-real-estate@1.0.0 e2e-tests
> npx playwright install --with-deps && npx playwright test

Running 1 test using 1 worker
[WebServer] - Generating browser application bundles (phase: setup)...
...
  1 passed (1m)
```

We can now view tjhe report and dive into the traces if needed:

```
$ npx playwright show-report

  Serving HTML report at http://localhost:9323. 
  Press Ctrl+C to quit.
```

---

## 6. Auto-Generating Test Spec

Let's see if we can get a first-cut of the test specification auto-generated for us by Playwright [codegen](https://playwright.dev/docs/codegen-intro). To do this, we first start our local dev server explicitly in one window:

```
$npm run start
```
Then start the codegen tool in another:

```
$ npx playwright codegen
```

We have the user scenarios we want to script out - with codegen we just walk through the user story in the deployed app and have the user interactions (elements interacted with, interaction events) captured and converted into a corresponding test script that we can refine after.

_When your desired interaction scenario is complete, stop the code generation by pressing the `record` button, then copy the script over to a new spec file_. See [codegen.spec.ts](./e2e-tests/codegen.spec.ts) as an example.

Now validate the codegen-erated spec by executing a test run:

```
npm run e2e-tests

> contoso-real-estate@1.0.0 e2e-tests
> npx playwright install --with-deps && npx playwright test


Running 2 tests using 2 workers
...
```

In this case, we see generated test actions running successfully until it hits a test action that takes longer than the default timeout to complete, at which point it exits and saves the report for review.

```
  1) [chromium] › codegen.spec.ts:3:1 › test =======================================================

    Test timeout of 30000ms exceeded.

    locator.click: Target closed
    =========================== logs ===========================
    waiting for getByRole('link', { name: 'Browse listings' })
    ============================================================
```

This tells us two things of value:
 - Codegen is great at identifying a viable selector/locator for the desired user action we are testing at each step. This gives us a starting point for the test action.
 - Codegen does not understand the nuances of what is being tested and why, and does not _customize_ test action parameters for you by default. This means we need a post-generation refactoring step.

---

## 7. Refining the Test Spec

In this specific case, the timeout is exceeded because the specified interaction was for a feature that is not yet complete. In the code generation process, the user (me) simply moved ahead to the next interaction after the timeout. In the script, the failure of the test action terminates the test script (as written) at that point.

During refactoring we can configure individual scripts to:
 1. Override global defaults (e.g., timeout) if needed, based on local context. See [TestConfig](https://playwright.dev/docs/api/class-testconfig#test-config-test-ignore) for options.
 2. Establish context/conditions on the test itself (e.g., skip, fixme, setTimeout). See [Playwright Test](https://playwright.dev/docs/api/class-test#test-fixme-1) for options.
 3. Group tests in ways that support contextual execution. 
    - See [Suite](https://playwright.dev/docs/api/class-suite) = groups actions using [test.describe](https://playwright.dev/docs/api/class-test#test-describe-1)
    - See [Annotations](https://playwright.dev/docs/test-annotations) = group by context, [--grep](https://playwright.dev/docs/test-annotations#tag-tests) tags

Let's work through these one by one.

----

## 8. Automating the Test Run

---
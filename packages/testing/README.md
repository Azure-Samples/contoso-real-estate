# Application Testing

The included [Playwright](https://playwright.dev/) tests should cover the following needs:
 - UI Testing: Validate UI components behave as desired
 - API Testing: Validate API request/responses for varying paths and conditions
 - E2E Testing: Validate UX workflows related to user stories and scenarios
 
## Data Fixtures

Data fixtures will be set up for testing purposes once the UI and API specifications are finalized.
When created, they should be located in the e2e-fixtures directory under testing.

## Run Tests

To run the tests:

1. CD to /tests
2. Run `npm i && npx playwright install`
3. Run `npx playwright test`

You can use the `--headed` flag to open a browser when running the tests.

## Debug Tests

Add the `--debug` flag to run with debugging enabled. You can find out more info here: https://playwright.dev/docs/next/test-cli#reference

```bash
npx playwright test --debug
```

More debugging references: https://playwright.dev/docs/debug and https://playwright.dev/docs/trace-viewer

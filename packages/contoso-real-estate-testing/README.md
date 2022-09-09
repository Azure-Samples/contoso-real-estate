# Application Tests

The included [Playwright](https://playwright.dev/) smoke test will hit the ToDo app web endpoint, create, and delete an item.

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
import { test, expect  } from '@playwright/test';

// create base URL from 3 sources:
// 1. SERVICE_API_ENDPOINTS - set by GitHub Actions
// 2. CODESPACE_NAME - set by GitHub Codespaces
// 3. localhost:7071 - default
const BASE_URL = process.env.SERVICE_API_ENDPOINTS && process.env.SERVICE_API_ENDPOINTS[0]
  ? process.env.SERVICE_API_ENDPOINTS[0]
  : process.env.CODESPACE_NAME
    ? `https://${process.env.CODESPACE_NAME}-${process.env.CODESPACE_PORT}.githubpreview.dev`
    : 'http://localhost:7072';

test.use({
  baseURL: BASE_URL
});

// Test that PostgreSQL DB is up and running
test('should get listings', async ({ request }) => {

  const urlsResponse = await request.get('/api/listings');

  const responseOk = urlsResponse.ok();
  expect(responseOk).toBeTruthy();

  const responseJson = await urlsResponse.json();
  expect(Array.isArray(responseJson)).toBeTruthy();
  expect(responseJson.length).not.toEqual(0);
});

// Test that Cosmos DB is up and running
test('should get users', async ({ request }) => {

  const urlsResponse = await request.get('/api/users');

  const responseOk = urlsResponse.ok();
  expect(responseOk).toBeFalsy();

  // Test for correct error status code
  // Assumes users table is empty
  expect(urlsResponse.status()).toEqual(404);

});

import { test, expect  } from '@playwright/test';

// create base URL from 3 sources:
// 1. Azure: JSON.parse(process.env.SERVICE_API_ENDPOINTS)[0] - output array as string from `./infra/main.bicep`
// 2. GitHub Codespaces: `https://${process.env.CODESPACE_NAME}-${process.env.CODESPACE_PORT}.githubpreview.dev`
// 3. Local development on a local machine: `localhost:7071`
const BASE_URL = process.env.SERVICE_API_ENDPOINTS
  ? JSON.parse(process.env.SERVICE_API_ENDPOINTS)[0]
  : process.env.CODESPACE_NAME
    ? `https://${process.env.CODESPACE_NAME}-${process.env.CODESPACE_PORT}.githubpreview.dev`
    : 'http://localhost:7072';

console.log(`BASE_URL: ${BASE_URL}`);

test.use({
  baseURL: BASE_URL
});

// Test that PostgreSQL DB is up and running
// Default: listings returns array of items
test('should get listings', async ({ request }) => {

  const urlsResponse = await request.get('/api/listings');

  expect(urlsResponse.ok()).toBeTruthy();

  const responseJson = await urlsResponse.json();
  expect(Array.isArray(responseJson)).toBeTruthy();
  expect(responseJson.length).not.toEqual(0);
});

// Test that Cosmos DB is up and running
// Default: users is empty so returns 404
test('should get users', async ({ request }) => {

  const urlsResponse = await request.get('/api/users');

  expect(urlsResponse.ok()).toBeFalsy();

  // Test for correct error status code
  // Assumes users table is empty
  expect(urlsResponse.status()).toEqual(404);

});

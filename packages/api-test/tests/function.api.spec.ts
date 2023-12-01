import { test, expect  } from '@playwright/test';

const BASE_URL = process.env.SERVICE_API_ENDPOINTS
  ? JSON.parse(process.env.SERVICE_API_ENDPOINTS)[0]
  : 'http://localhost:7071';

console.log(`BASE_URL: ${BASE_URL}`);

test.use({
  baseURL: BASE_URL
});

// Test that PostgreSQL DB is up and running
// Default: listings returns array of items
test('should get listings', async ({ request }) => {

  const URL = `${BASE_URL}/api/listings`;
  console.log(`URL: ${URL}`);

  const urlsResponse = await request.get(URL);

  expect(urlsResponse.ok()).toBeTruthy();

  const responseJson = await urlsResponse.json();
  expect(Array.isArray(responseJson)).toBeTruthy();
  expect(responseJson.length).not.toEqual(0);
});

// Test that Cosmos DB is up and running
// Default: users is empty so returns 404
test('should get users', async ({ request }) => {

  const URL = `${BASE_URL}/api/users`;
  console.log(`URL: ${URL}`);

  const urlsResponse = await request.get(URL);

  expect(urlsResponse.ok()).toBeFalsy();

  // Test for correct error status code
  // Assumes users table is empty
  expect(urlsResponse.status()).toEqual(404);

});

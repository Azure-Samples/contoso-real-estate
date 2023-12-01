
/**
 * In this script, we will login and run a few tests that use GitHub API.
 *
 * Steps summary
 * 1. Create a new repo.
 * 2. Run tests that programmatically create new issues.
 * 3. Delete the repo.
 */

import { test, expect  } from '@playwright/test';

test('should get listings', async ({ request }) => {
  const urlsResponse = await request.get(`/listings`);
  const responseOk = urlsResponse.ok();
  expect(responseOk).toBeTruthy();

  const responseJson = await urlsResponse.json();

  expect(responseJson).not.toEqual(undefined);
});

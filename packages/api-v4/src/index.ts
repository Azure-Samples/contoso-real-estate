/**
 * file: packages/api-v4/src/index.ts
 * description: file responsible for the main entry point of the api functions (v4)
 * data: 08/01/2023
 * author: Glaucia Lemos
 */

import { app } from "@azure/functions";
import { httpTriggerTest } from './functions/httpTriggerTest';
import { getUsers, getUserById, postUsers } from './functions/users';
import { getPaymentById, getPayments, postPayment } from './functions/payments';
import { getReservationById, getReservations } from './functions/reservations';
import { getFavorites, postFavorites } from './functions/favorites';
import { getListingById, getListings } from './functions/listings';
import { openApi } from "./functions/openapi";

//#region Test Trigger Function
app.get('httpTriggerTest', {
  authLevel: 'anonymous',
  handler: httpTriggerTest
});
//#endregion

//#region User Function
app.get('get-users', {
  route: 'users',
  authLevel: 'anonymous',
  handler: getUsers,
});

app.get('get-users-by-id', {
  route: 'users/{id}',
  authLevel: 'anonymous',
  handler: getUserById,
});

app.post('post-users', {
  route: 'users',
  authLevel: 'anonymous',
  handler: postUsers,
});
//#endregion

//#region Payment Function
app.get('get-payment-by-id', {
  route: 'payments/{id}',
  authLevel: 'anonymous',
  handler: getPaymentById
});

app.get('get-payments', {
  route: 'payments',
  authLevel: 'anonymous',
  handler: getPayments
});

app.post('post-payment', {
  route: 'payments',
  authLevel: 'anonymous',
  handler: postPayment
});
//#endregion

//#region Reservation Function
app.get('get-reservation-by-id', {
  route: 'reservations/{id}',
  authLevel: 'anonymous',
  handler: getReservationById
});

app.get('get-reservations', {
  route: 'reservations',
  authLevel: 'anonymous',
  handler: getReservations
});
//#endregion

//#region Favorite Function
app.get('get-favorites', {
  route: 'favorites',
  authLevel: 'anonymous',
  handler: getFavorites
});

app.post('post-favorites', {
  route: 'favorites',
  authLevel: 'anonymous',
  handler: postFavorites
});
//#endregion

//#region Listing Function
app.get('get-listing-by-id', {
  route: 'listings/{id}',
  authLevel: 'anonymous',
  handler: getListingById
});

app.get('get-listings', {
  route: 'listings',
  authLevel: 'anonymous',
  handler: getListings
});
//#endregion

//#region OpenApi Function
app.get('openapi', {
  route: '{filename?}',
  authLevel: 'anonymous',
  handler: openApi
});
//#endregion

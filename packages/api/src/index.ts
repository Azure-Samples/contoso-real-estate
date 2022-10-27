import { app } from "@azure/functions";
import { getAddress, getAddressBySlug } from "./functions/address";
import { getFavoriteBySlug, getFavourites } from "./functions/favorite";
import { getListings, getListingsBySlug } from "./functions/listings";
import { openApi } from "./functions/openapi";
import { getPayments, getPaymentsBySlug } from "./functions/payments";
import { getReservations, getReservationsBySlug } from "./functions/reservations";
import { getUserBySlug, getUsers } from "./functions/users";
import { applyMiddleware, limit, offsetLimitRange, offset } from "./middleware";

app.get("get-user-by-slug", {
  route: "users/{slug}",
  handler: getUserBySlug,
});

app.get("get-users", {
  route: "users",
  handler: applyMiddleware(getUsers, limit, offset, offsetLimitRange),
});

app.get("get-address-by-slug", {
  route: "addresses/{slug}",
  handler: getAddressBySlug,
});

app.get("get-addresses", {
  route: "addresss",
  handler: applyMiddleware(getAddress, limit, offset, offsetLimitRange),
});

app.get("get-favorite-by-slug", {
  route: "favorites/{slug}",
  handler: getFavoriteBySlug,
});

app.get("get-favorites", {
  route: "favorites",
  handler: applyMiddleware(getFavourites, limit, offset, offsetLimitRange),
});

app.get("get-listing-by-slug", {
  route: "listings/{slug}",
  handler: getListingsBySlug,
});

app.get("get-listings", {
  route: "listings",
  handler: applyMiddleware(getListings, limit, offset, offsetLimitRange),
});

app.get("get-payment-by-slug", {
  route: "payments/{slug}",
  handler: getPaymentsBySlug,
});

app.get("get-payments", {
  route: "payments",
  handler: applyMiddleware(getPayments, limit, offset, offsetLimitRange),
});

app.get("get-reservation-by-slug", {
  route: "reservations/{slug}",
  handler: getReservationsBySlug,
});

app.get("get-reservations", {
  route: "reservations",
  handler: applyMiddleware(getReservations, limit, offset, offsetLimitRange),
});

app.get("open-api", {
  route: "{filename?}",
  handler: openApi,
});

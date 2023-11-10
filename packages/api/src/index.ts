import { app } from "@azure/functions";
import { getUsers, getUserById, postUsers } from "./functions/users";
import { getPaymentById, getPayments, postPayment } from "./functions/payments";
import { getReservationById, getReservations, patchReservationById } from "./functions/reservations";
import { getFavorites, postFavorites, deleteFavorite } from "./functions/favorites";
import { getListingById, getListings } from "./functions/listings";
import { openApi } from "./functions/openapi";
import { postCheckout } from "./functions/checkout";

//#region User Function
app.get("users-get", {
  route: "users",
  authLevel: "anonymous",
  handler: getUsers,
});

app.get("users-get-by-id", {
  route: "users/{id}",
  authLevel: "anonymous",
  handler: getUserById,
});

app.post("users-post", {
  route: "users",
  authLevel: "anonymous",
  handler: postUsers,
});
//#endregion

//#region Payment Function
app.get("payment-get-by-id", {
  route: "payments/{id}",
  authLevel: "anonymous",
  handler: getPaymentById,
});

app.get("payments-get", {
  route: "payments",
  authLevel: "anonymous",
  handler: getPayments,
});

app.post("payment-post", {
  route: "payments",
  authLevel: "anonymous",
  handler: postPayment,
});
//#endregion

//#region Reservation Function
app.get("reservation-get-by-id", {
  route: "reservations/{id}",
  authLevel: "anonymous",
  handler: getReservationById,
});

app.get("reservations-get", {
  route: "reservations",
  authLevel: "anonymous",
  handler: getReservations,
});

app.patch("reservations-patch", {
  route: "reservations/{id}",
  authLevel: "anonymous",
  handler: patchReservationById,
});
//#endregion

//#region Favorite Function
app.get("favorites-get", {
  route: "favorites",
  authLevel: "anonymous",
  handler: getFavorites,
});

app.post("favorites-post", {
  route: "favorites",
  authLevel: "anonymous",
  handler: postFavorites,
});

app.deleteRequest("favorites-delete", {
  route: "favorites",
  authLevel: "anonymous",
  handler: deleteFavorite,
});
//#endregion

//#region Listing Function
app.get("listing-get-by-id", {
  route: "listings/{id}",
  authLevel: "anonymous",
  handler: getListingById,
});

app.get("listings-get", {
  route: "listings",
  authLevel: "anonymous",
  handler: getListings,
});
//#endregion

//#region OpenApi Function
app.get("openapi-get", {
  route: "{filename?}",
  authLevel: "anonymous",
  handler: openApi,
});
//#endregion

//#region Checkout Function
app.post("checkout-post", {
  route: "checkout",
  authLevel: "anonymous",
  handler: postCheckout,
});
//#endregion

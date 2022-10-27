import { app } from "@azure/functions";
import { getUserBySlug, getUsers } from "./functions/users";
import { applyMiddleware, limit, offsetLimitRange, offset } from "./middleware";

console.log("Starting up the app");

app.get("get-users", {
  route: "users",
  handler: applyMiddleware(getUsers, limit, offset, offsetLimitRange),
});

app.get("get-user-by-slug", {
  route: "users/{slug}",
  handler: getUserBySlug,
});

import { HttpRequest, HttpResponseInit, InvocationContext } from "@azure/functions";
import { initializeDatabaseConfiguration } from "../config";
import {
  fetchFavoritesDataByUserId,
  findFavorite,
  getFavoritesByUserId,
  saveFavorite,
  removeFavorite,
} from "../models/favorite";
import { User } from "../models/user.schema";
import { Listing } from "../models/listing.schema";

// GET: Favorites
export async function getFavorites(request: HttpRequest, context: InvocationContext): Promise<HttpResponseInit> {
  context.log(`Http function getFavorites processed request for url "${request.url}"`);

  await initializeDatabaseConfiguration();

  const offset = Number(request.query.get("offset")) || 0;
  const limit = Number(request.query.get("limit")) || 10;

  const userId = request.query.get("userId");
  const listingId = request.query.get("listingId");
  const aggregate = request.query.get("aggregate");

  // UserID is the only required parameter
  if (!userId || userId === "undefined") {
    return {
      status: 400,
      jsonBody: {
        error: "UserId is missing",
      },
    };
  }

  if (offset < 0) {
    return {
      status: 400,
      jsonBody: {
        error: "Offset must be greater than or equal to 0",
      },
    };
  } else if (limit < 0) {
    return {
      status: 400,
      jsonBody: {
        error: "Limit must be greater than or equal to 0",
      },
    };
  } else if (offset > limit) {
    return {
      status: 400,
      jsonBody: {
        error: "Offset must be less than or equal to limit",
      },
    };
  }

  try {
    if (userId && !listingId) {
      let favorites = [];

      if (aggregate === "true") {
        // get a list of favorites with listing data (from Strapi)
        favorites = await fetchFavoritesDataByUserId({ userId });
      } else {
        // simply get a list of favorites IDs
        favorites = await getFavoritesByUserId({ userId });
      }

      if (favorites.length > 0) {
        return {
          jsonBody: favorites,
        };
      } else {
        return {
          status: 404,
          jsonBody: {
            error: "Favorites not found",
          },
        };
      }
    } else if (userId && listingId) {
      const favorite = await findFavorite({ userId, listingId });

      if (favorite) {
        return {
          jsonBody: [favorite],
        };
      } else {
        return {
          status: 404,
          jsonBody: {
            error: "Favorite not found",
          },
        };
      }
    }
  } catch (error: unknown) {
    const err = error as Error;
    context.error("Error...", err.message);
    return {
      status: 500,
      jsonBody: {
        error: "Internal server error",
      },
    };
  }

  return {
    status: 500,
    jsonBody: {
      error: "Internal server error",
    },
  };
}

// POST: Favorites
export async function postFavorites(request: HttpRequest, context: InvocationContext): Promise<HttpResponseInit> {
  context.log(`Http function postFavorite processed request for url "${request.url}"`);

  await initializeDatabaseConfiguration();

  const jsonData = await request.json();

  const { listing, user } = jsonData as { listing: Listing; user: User };

  if (!listing || !user) {
    return {
      status: 400,
      jsonBody: {
        error: "Missing query parameters",
      },
    };
  }

  if (listing.id === undefined) {
    return {
      status: 400,
      jsonBody: {
        error: "Listing id is not valid",
      },
    };
  }

  try {
    const favoriteModel = await saveFavorite({
      listingId: listing.id,
      userId: user.id,
      createdAt: new Date().toISOString(),
    });
    return {
      status: 200,
      jsonBody: favoriteModel,
    };
  } catch (error) {
    return {
      status: 500,
      jsonBody: {
        error: "Internal server error",
      },
    };
  }
}

// DELETE: Favorite
export async function deleteFavorite(request: HttpRequest, context: InvocationContext): Promise<HttpResponseInit> {
  context.log(`Http function deleteFavorite processed request for url "${request.url}"`);

  await initializeDatabaseConfiguration();

  const userId = request.query.get("userId");
  const listingId = request.query.get("listingId");

  if (!listingId || !userId) {
    return {
      status: 400,
      jsonBody: {
        error: "Missing query parameters",
      },
    };
  }

  try {
    await removeFavorite({ listingId, userId });
    return {
      status: 204,
    };
  } catch (error: unknown) {
    const err = error as Error;
    context.error("Error...", err.message);
    return {
      status: 500,
      jsonBody: {
        error: "Internal server error",
      },
    };
  }
}

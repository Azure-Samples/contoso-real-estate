import { AzureFunction, Context, HttpRequest } from "@azure/functions";
import { initializeDatabaseConfiguration } from "../config";
import { findFavorite, fetchFavoritesDataByUserId, getFavoritesByUserId } from "../models/favorite";

const getFavorites: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
  await initializeDatabaseConfiguration();

  const offset = Number(req.query.offset) || 0;
  const limit = Number(req.query.limit) || 10;
  const { userId, listingId, aggregate } = req.query;

  // UserID is the only required parameter
  if (!userId || userId === "undefined") {
    context.res = {
      status: 400,
      body: {
        error: "UserId is missing",
      },
    };
    return;
  }

  if (offset < 0) {
    context.res = {
      status: 400,
      body: {
        error: "Offset must be greater than or equal to 0",
      },
    };
    return;
  }

  if (limit < 0) {
    context.res = {
      status: 400,
      body: {
        error: "Limit must be greater than or equal to 0",
      },
    };
    return;
  }

  if (offset > limit) {
    context.res = {
      status: 400,
      body: {
        error: "Offset must be less than or equal to limit",
      },
    };
    return;
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
        context.res = {
          body: favorites,
        };
      } else {
        context.res = {
          status: 404,
          body: {
            error: "Favorites not found",
          },
        };
      }
    } else if (userId && listingId) {
      const favorite = await findFavorite({ userId, listingId });

      if (favorite) {
        context.res = {
          body: [favorite],
        };
      } else {
        context.res = {
          status: 404,
          body: {
            error: "Favorite not found",
          },
        };
      }
    }
  } catch (error: any) {
    context.res = {
      status: 500,
      body: {
        error: error?.message,
      },
    };
  }
};

export default getFavorites;

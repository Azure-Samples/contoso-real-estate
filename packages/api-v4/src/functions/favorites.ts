import { HttpRequest, HttpResponseInit, InvocationContext } from "@azure/functions";
import { fetchFavoritesDataByUserId, findFavorite, getFavoritesByUserId } from '../models/favorite';

// GET: Favorites
export async function getFavorites(request: HttpRequest, context: InvocationContext): Promise<HttpResponseInit> {
  context.log(`Http function getFavorites processed request for url "${request.url}"`);

  const offset = Number(request.query.get('offset')) || 0;
  const limit = Number(request.query.get('limit')) || 10;

  const { userId, listingId, aggregate } = request.params;

  if (!userId || userId === 'undefined') {
    return {
      status: 400,
      jsonBody: {
        error: 'UserId is missing',
      },
    };
  }

  if (offset < 0) {
    return {
      status: 400,
      jsonBody: {
        error: 'Offset must be greater than or equal to 0',
      },
    };
  } else if (limit < 0) {
    return {
      status: 400,
      jsonBody: {
        error: 'Limit must be greater than or equal to 0',
      },
    };
  } else if (offset > limit) {
    return {
      status: 400,
      jsonBody: {
        error: 'Offset must be less than or equal to limit',
      },
    };
  }

  try {
    if (userId && !listingId) {
      let favorites = [];

      if (aggregate === 'true') {
        // get a list of favorites with listing data (from Strapi)
        favorites = await fetchFavoritesDataByUserId({ userId });
      } else {
        // simply get a list of favorites IDs
        favorites = await getFavoritesByUserId({ userId });
      }

      if (favorites.length > 0) {
        return {
          jsonBody: favorites,
        }
      } else {
        return {
          status: 404,
          jsonBody: {
            error: 'Favorites not found',
          },
        };
      }
    } else if (userId && listingId) {
      const favorite = await findFavorite({ userId, listingId });

      if (favorite) {
        return {
          jsonBody: [favorite],
        }
      } else {
        return {
          status: 404,
          jsonBody: {
            error: 'Favorite not found',
          },
        };
      }
    }
  } catch (error) {
    return {
      status: 500,
      jsonBody: {
        error: 'Internal server error',
      },
    };
  }

  return {
    status: 500,
    jsonBody: {
      error: 'Internal server error',
    },
  };
};


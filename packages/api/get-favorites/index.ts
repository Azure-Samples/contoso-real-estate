import { AzureFunction, Context, HttpRequest } from "@azure/functions";
import { getFavoriteMock, getFavoriteByListingIdAndUserId } from "../models/favorite";

const getFavorite: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
  const offset = Number(req.query.offset) || 0;
  const limit = Number(req.query.limit) || 10;
  const userId = req.query.user;
  const listingId = req.query.listing;

  if (offset < 0) {
    context.res = {
      status: 400,
      body: {
        error: "Offset must be greater than or equal to 0",
      },
    };
    return;
  } else if (limit < 0) {
    context.res = {
      status: 400,
      body: {
        error: "Limit must be greater than or equal to 0",
      },
    };
    return;
  } else if (offset > limit) {
    context.res = {
      status: 400,
      body: {
        error: "Offset must be less than or equal to limit",
      },
    };
    return;
  }

  if (userId && listingId) {
    const favorite = await getFavoriteByListingIdAndUserId({ userId, listingId });

    if (favorite) {
      context.res = {
        body: favorite,
      };
    } else {
      context.res = {
        status: 404,
        body: {
          error: "Favorite not found",
        },
      };
    }

    return;
  }

  context.res = {
    body: {
      listings: await getFavoriteMock({ offset, limit }),
    },
  };
};

export default getFavorite;

import { AzureFunction, Context, HttpRequest } from "@azure/functions";
import { saveFavorite } from "../models/favorite";

const postFavorite: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
  const { listing, user } = req.body;

  if (!listing || !user) {
    context.res = {
      status: 400,
      body: {
        error: "Missing query parameters",
      },
    };
    return;
  }

  if (listing.id === undefined) {
    context.res = {
      status: 400,
      body: {
        error: "Listing id is not valid",
      },
    };
    return;
  }

  try {
    const model = await saveFavorite({ listingId: listing.id, userId: user._id, createdAt: new Date().toISOString() });
    context.res = {
      status: 200,
      body: model,
    };
  } catch (error: any) {
    context.res = {
      status: 500,
      body: {
        error: error.message,
      },
    };
  }
};

export default postFavorite;

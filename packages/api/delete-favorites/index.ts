import { AzureFunction, Context, HttpRequest } from "@azure/functions";
import { deleteFavoriteMockBySlug } from "../models/favorite";

const deleteFavorite: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
  const { listing, user } = req.query;

  if (!listing || !user) {
    context.res = {
      status: 400,
      body: {
        error: "Missing query parameters",
      },
    };
    return;
  }

  context.res = {
    body: {
      success: await deleteFavoriteMockBySlug({ listing, user }),
    },
  };
};

export default deleteFavorite;

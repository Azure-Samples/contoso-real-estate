import { AzureFunction, Context, HttpRequest } from "@azure/functions";
import { postFavoriteMock } from "../models/favorite";

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

  context.res = {
    body: {
      success: await postFavoriteMock({ listing, user }),
    },
  };
};

export default postFavorite;

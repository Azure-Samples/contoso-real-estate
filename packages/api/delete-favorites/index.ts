import { AzureFunction, Context, HttpRequest } from "@azure/functions";
import { initializeDatabaseConfiguration } from "../config";
import { removeFavorite } from "../models/favorite";

const deleteFavorite: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
  await initializeDatabaseConfiguration();

  const { listingId, userId } = req.query;

  if (!listingId || !userId) {
    context.res = {
      status: 400,
      body: {
        error: "Missing query parameters",
      },
    };
    return;
  }

  try {
    await removeFavorite({ listingId, userId });
    context.res = {
      status: 204,
    };
  } catch (error: any) {
    context.res = {
      status: 500,
      body: {
        error: error?.message,
      },
    };
  }
};

export default deleteFavorite;

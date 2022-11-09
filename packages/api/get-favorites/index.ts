import { AzureFunction, Context, HttpRequest } from "@azure/functions";
import { getFavoriteMock } from "../models/favorite";

const data = async ({ offset, limit }: { offset: number; limit: number }) => await getFavoriteMock({ offset, limit });

const getFavorite: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
  const offset = Number(req.query.offset) || 0;
  const limit = Number(req.query.limit) || 10;

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

  context.res = {
    body: {
      listings: await data({ offset, limit }),
    },
  };
};

export default getFavorite;

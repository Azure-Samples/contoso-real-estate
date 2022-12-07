import { Context, HttpRequest } from "@azure/functions";
import { getListings } from "../models/listing";

const data = async ({ offset, limit, featured }: { offset: number; limit: number, featured: boolean }) => await getListings({ offset, limit, featured });

export default async function (context: Context, req: HttpRequest): Promise<void> {
  const offset = Number(req.query.offset) || 0;
  const limit = Number(req.query.limit) || 10;
  const featured = Boolean(req.query.featured) || false;

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
      listings: await data({ offset, limit, featured }),
    },
  };
}

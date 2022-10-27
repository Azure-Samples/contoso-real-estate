import { HttpHandler } from "@azure/functions";
import { getListingBySlugMock, getListingsMock } from "../../models/listing";

export const getListingsBySlug: HttpHandler = async (context, req) => {
  const slug = req.params.slug;

  const model = await getListingBySlugMock({ slug });

  if (model) {
    return {
      body: model,
    };
  }

  return {
    status: 404,
    body: {
      error: "not found",
    },
  };
};

export const getListings: HttpHandler = async (context, req) => {
  const offset = Number(req.query.get("offset")) || 0;
  const limit = Number(req.query.get("limit")) || 10;

  return {
    body: {
      listings: await getListingsMock({ offset, limit }),
    },
  };
};

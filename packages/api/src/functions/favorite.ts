import { HttpHandler } from "@azure/functions";
import { getFavoriteBySlugMock, getFavoriteMock } from "../../models/favorite";

export const getFavoriteBySlug: HttpHandler = async (context, req) => {
  const slug = Number(req.params.slug) || 0;

  const model = await getFavoriteBySlugMock({ slug });

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

export const getFavourites: HttpHandler = async (context, req) => {
  const offset = Number(req.query.get("offset")) || 0;
  const limit = Number(req.query.get("limit")) || 10;

  return {
    body: {
      favourites: await getFavoriteMock({ offset, limit }),
    },
  };
};

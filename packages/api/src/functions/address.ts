import { HttpHandler } from "@azure/functions";
import { getAddressBySlugMock, getAddressMock } from "../../models/address";

export const getAddressBySlug: HttpHandler = async (context, req) => {
  const slug = Number(req.params.slug) || 0;

  const model = await getAddressBySlugMock({ slug });

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

export const getAddress: HttpHandler = async (context, req) => {
  const offset = Number(req.query.get("offset")) || 0;
  const limit = Number(req.query.get("limit")) || 10;

  return {
    body: {
      listings: await getAddressMock({ offset, limit }),
    },
  };
};

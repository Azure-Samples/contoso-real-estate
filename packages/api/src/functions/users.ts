import type { HttpHandler } from "@azure/functions";
import { getUserBySlugMock, getUsersMock } from "../../models/user";

export const getUsers: HttpHandler = async (context, { query }) => {
  const offset = Number(query.get("offset")) || 0;
  const limit = Number(query.get("limit")) || 10;

  return {
    body: {
      listings: await getUsersMock({ offset, limit }),
    },
  };
};

export const getUserBySlug: HttpHandler = async (context, { params }) => {
  const slug = Number(params.slug) || 0;

  const model = await getUserBySlugMock({ slug });

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

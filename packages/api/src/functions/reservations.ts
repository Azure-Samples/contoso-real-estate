import { HttpHandler } from "@azure/functions";
import { getReservationBySlugMock, getReservationsMock } from "../../models/reservation";

export const getReservationsBySlug: HttpHandler = async (context, req) => {
  const slug = Number(req.params.slug) || 0;

  const model = await getReservationBySlugMock({ slug });

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

export const getReservations: HttpHandler = async (context, req) => {
  const offset = Number(req.query.get("offset")) || 0;
  const limit = Number(req.query.get("limit")) || 10;

  return {
    body: {
      reservations: await getReservationsMock({ offset, limit }),
    },
  };
};

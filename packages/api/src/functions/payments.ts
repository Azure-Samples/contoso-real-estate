import { HttpHandler } from "@azure/functions";
import { getPaymentBySlugMock, getPaymentsMock } from "../../models/payment";

export const getPaymentsBySlug: HttpHandler = async (context, req) => {
  const slug = Number(req.params.slug) || 0;

  const model = await getPaymentBySlugMock({ slug });

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

export const getPayments: HttpHandler = async (context, req) => {
  const offset = Number(req.query.get("offset")) || 0;
  const limit = Number(req.query.get("limit")) || 10;

  return {
    body: {
      payments: await getPaymentsMock({ offset, limit }),
    },
  };
};

import { AzureFunction, Context, HttpRequest } from "@azure/functions";
import { initializeDatabaseConfiguration } from "../config";
import { findReservationsByUserId } from "../models/reservation";

const getReservations: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
  await initializeDatabaseConfiguration();

  const offset = Number(req.query.offset) || 0;
  const limit = Number(req.query.limit) || 10;
  const { userId } = req.query;

  // UserID is the only required parameter
  if (!userId || userId === "undefined") {
    context.res = {
      status: 400,
      body: {
        error: "UserId is missing",
      },
    };
    return;
  }

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
      reservations: await findReservationsByUserId(userId, offset, limit),
    },
  };
};

export default getReservations;

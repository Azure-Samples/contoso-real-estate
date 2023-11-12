import { HttpRequest, HttpResponseInit, InvocationContext } from "@azure/functions";
import { initializeDatabaseConfiguration } from "../config";
import { findReservationById, findReservationsByUserId, updateReservationStatus } from "../models/reservation";
import { Reservation } from "../models/reservation.schema";

// GET: Get Reservation by Id
export async function getReservationById(request: HttpRequest, context: InvocationContext): Promise<HttpResponseInit> {
  context.log(`Http function getReservationById processed request for url "${request.url}"`);

  const id = request.params.id ?? "";

  const reservation = await findReservationById(id);

  if (reservation) {
    return {
      jsonBody: reservation,
    };
  } else {
    return {
      status: 404,
      jsonBody: {
        error: "Reservation record not found",
      },
    };
  }
}

// GET: Get Reservations
export async function getReservations(request: HttpRequest, context: InvocationContext): Promise<HttpResponseInit> {
  context.log(`Http function getReservations processed request for url "${request.url}"`);

  const offset = Number(request.query.get("offset")) || 0;
  const limit = Number(request.query.get("limit")) || 10;

  const { userId } = request.params;

  // UserID is the only required parameter
  if (!userId || userId === "undefined") {
    return {
      status: 400,
      jsonBody: {
        error: "userId is missing",
      },
    };
  }

  if (offset < 0) {
    return {
      status: 400,
      jsonBody: {
        error: "Offset must be greater than or equal to 0",
      },
    };
  } else if (limit < 0) {
    return {
      status: 400,
      jsonBody: {
        error: "Limit must be greater than or equal to 0",
      },
    };
  } else if (offset > limit) {
    return {
      status: 400,
      jsonBody: {
        error: "Offset must be less than or equal to limit",
      },
    };
  }

  try {
    const reservations = await findReservationsByUserId(userId, offset, limit);

    if (reservations) {
      return {
        jsonBody: reservations,
      };
    } else {
      return {
        status: 404,
        jsonBody: {
          error: "Reservation not found",
        },
      };
    }
  } catch (error) {
    return {
      status: 500,
      jsonBody: {
        error: "Internal Server Error",
      },
    };
  }
}

// PATCH: Reservation by Id
export async function patchReservationById(
  request: HttpRequest,
  context: InvocationContext,
): Promise<HttpResponseInit> {
  context.log(`Http function patchReservationById processed request for url "${request.url}"`);

  await initializeDatabaseConfiguration();

  const id = request.params.id as string;
  const status = (await request.json()) as Reservation["status"];

  if (!status) {
    return {
      status: 400,
      jsonBody: {
        error: "Reservation status is missing",
      },
    };
  } else if (status !== "active" && status !== "cancelled") {
    return {
      status: 400,
      jsonBody: {
        error: "Reservation status must be either 'active' or 'canceled'",
      },
    };
  }

  try {
    const recordReservation = await updateReservationStatus(id, status);

    if (recordReservation) {
      return {
        jsonBody: recordReservation,
      };
    } else {
      return {
        status: 404,
        jsonBody: {
          error: "Reservation not found for specified id",
        },
      };
    }
  } catch (error) {
    const err = error as Error;
    context.error(`Error updating reservation status: ${err.message}`);
    return {
      status: 500,
      jsonBody: {
        error: "Error updating reservation status",
      },
    };
  }
}

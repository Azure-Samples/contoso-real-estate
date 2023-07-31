import { app, HttpRequest, HttpResponseInit, InvocationContext } from "@azure/functions";
import { findReservationById, findReservationsByUserId } from "../models/reservation";

// GET: Get Reservation by Id
export async function getReservationById(request: HttpRequest, context: InvocationContext): Promise<HttpResponseInit> {
  context.log(`Http function getReservationById processed request for url "${request.url}"`);

  const id = request.params.id ?? '';

  const reservation = await findReservationById(id);

  if (reservation) {
    return {
      jsonBody: reservation,
    }
  } else {
    return {
      status: 404,
      jsonBody: {
        error: "Reservation record not found"
      }
    }
  }
};


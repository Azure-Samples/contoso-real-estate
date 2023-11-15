import { AzureFunction, Context, HttpRequest } from "@azure/functions";
import { initializeDatabaseConfiguration } from "../config";
import { findReservationById } from "../models/reservation";

const getReservationById: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
  await initializeDatabaseConfiguration();
  const id = req.params.id ?? "";

  const model = await findReservationById(id);

  if (model) {
    context.res = {
      body: model,
    };
  } else {
    context.res = {
      status: 404,
      body: {
        error: "Reservation not found",
      },
    };
  }
};

export default getReservationById;

import { AzureFunction, Context, HttpRequest } from "@azure/functions";
import { initializeDatabaseConfiguration } from "../config";
import { updateReservationStatus } from "../models/reservation";

const patchReservationById: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
  await initializeDatabaseConfiguration();
  const id = req.params.id as string;
  const status = req.body.status;

  if (!status || status === "undefined") {
    context.res = {
      status: 400,
      body: {
        error: "status is missing",
      },
    };
    return;
  } else if (status !== "active" && status !== "cancelled") {
    context.res = {
      status: 400,
      body: {
        error: "status must be active or cancelled",
      },
    };
    return;
  }

  try {
    const record = await updateReservationStatus(id, status);
    if (record) {
      context.res = {
        body: record,
      };
    } else {
      context.res = {
        status: 404,
        body: {
          error: "reservation not found for specified id",
        },
      };
    }
  } catch (error: unknown) {
    const err = error as Error;
    context.log.error(`Error updating reservation status: ${err.message}`);
    context.res = {
      status: 500,
      body: {
        error: "Error updating reservation status",
      },
    };
  }
};

export default patchReservationById;

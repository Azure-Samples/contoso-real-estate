import { AzureFunction, Context, HttpRequest } from "@azure/functions";
import { updateReservationStatus } from "../models/reservation";

const patchReservationById: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
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
};

export default patchReservationById;

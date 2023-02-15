import { AzureFunction, Context, HttpRequest } from "@azure/functions";
import { initializeDatabaseConfiguration } from "../config";
import getUserById from "../get-user-by-id";
import { savePayment } from "../models/payment";
import { updateReservationStatus } from "../models/reservation";

const postPayment: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
  await initializeDatabaseConfiguration();

  const payment = req.body;

  if (!payment.userId || payment.userId === 'undefined' || !payment.reservationId || !payment.provider || !payment.status || payment.amount === undefined || !payment.currency) {
    context.res = {
      status: 400,
      body: {
        error: "userId, reservationId, provider, status, amount, and currency must be specified",
      },
    };
    return;
  }

  try {
    const user = await getUserById(payment.userId);
    if (!user) {
      context.log.error(`Error payment received for unknown user id: ${payment.userId}`);
      context.res = {
        status: 404,
        body: {
          error: "user not found for specified id",
        },
      };
      return;
    }
  
    const reservationRecord = await updateReservationStatus(payment.reservationId, "active");
    if (!reservationRecord) {
      context.log.error(`Error payment received for unknown reservation id: ${payment.reservationId}`);
      context.res = {
        status: 404,
        body: {
          error: "reservation not found for specified id",
        },
      };
      return;
    }
  
    const paymentRecord = await savePayment(payment);
  
    context.res = {
      body: paymentRecord
    };
  } catch(error: unknown) {
    const err = error as Error;
    context.log.error(`Error creating payment: ${err.message}`);
    context.res = {
      status: 500,
      body: {
        error: "Error creating payment",
      },
    };
  }
};

export default postPayment;

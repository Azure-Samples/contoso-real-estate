import { AzureFunction, Context, HttpRequest } from "@azure/functions";
import Stripe from "stripe";
import { getConfig, initializeDatabaseConfiguration } from "../config";
import { savePayment } from "../models/payment";
import { updateReservationStatus } from "../models/reservation";

const postStripeWebhook: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
  await initializeDatabaseConfiguration();

  const config = await getConfig();
  const stripe = new Stripe(config.stripe.secretKey, { apiVersion: '2022-08-01' });
  const payload = req.rawBody;
  const signature = req.headers['stripe-signature'];

  let event;

  try {
    event = stripe.webhooks.constructEvent(payload, signature!, config.stripe.webhookSecret);
  } catch (error: any) {
    context.log.error(`Webhook Error: ${error.message}`)
    context.res = {
      status: 400,
      body: `Webhook Error: ${error.message}`,
    };
    return;
  }

  switch (event.type) {
    case 'checkout.session.completed':
      try {
        const session = event.data.object as Stripe.Checkout.Session;
        context.log.info(`Checkout session completed for ${session.id}`);
  
        const payment = {
          userId: session.metadata?.userId,
          reservationId: session.metadata?.reservationId,
          provider: 'stripe' as const,
          status: 'completed' as const,
          amount: Number(session.metadata?.amount),
          currency: session.metadata?.currency,
          createdAt: new Date(),
        };
  
        const paymentRecord = await savePayment(payment);
        const reservationRecord = await updateReservationStatus(session.metadata?.reservationId!, 'active');
        if (!reservationRecord) {
          context.log.error(`No reservation found for id ${session.metadata?.reservationId}`);
          context.res = {
            status: 400,
            body: `No reservation found for id ${session.metadata?.reservationId}`,
          };
          return;
        }

        context.log.info(`Reservation ${reservationRecord.id} completed with payment ${paymentRecord.id}`);
        context.res = {
          status: 200,
          body: `Reservation ${reservationRecord.id} completed with payment ${paymentRecord.id}`,
        };
      } catch (error: unknown) {
        const err = error as Error;
        context.log.error(`Error processing completed checkout session: ${err.message}`);
        context.res = {
          status: 500,
          body: `Error processing completed checkout session: ${err.message}`,
        };
      }
      break;

    case 'checkout.session.expired':
      try {
        const expiredSession = event.data.object as Stripe.Checkout.Session;
        context.log.info(`Checkout session expired for ${expiredSession.id}`);
  
        const reservationId = expiredSession.metadata?.reservationId;
        if (!reservationId) {
          context.log.error(`No reservationId found for session ${expiredSession.id}`);
          context.res = {
            status: 400,
            body: `No reservationId found for session ${expiredSession.id}`,
          };
          return;
        }
  
        const reservationRecord = await updateReservationStatus(reservationId, 'cancelled');
        if (!reservationRecord) {
          context.log.error(`No reservation found for id ${reservationId}`);
          context.res = {
            status: 400,
            body: `No reservation found for id ${reservationId}`,
          };
          return;
        }
        
        context.res = {
          status: 200,
          body: `Reservation ${reservationId} cancelled`,
        };
      } catch (error: unknown) {
        const err = error as Error;
        context.log.error(`Error processing expired checkout session: ${err.message}`);
        context.res = {
          status: 500,
          body: `Error processing expired checkout session: ${err.message}`,
        };
      }
      break;

    default:
      context.log.info(`Unhandled event type ${event.type}`);
      context.res = {
        status: 400,
        body: `Unhandled event type ${event.type}`,
      };
  }
};

export default postStripeWebhook;

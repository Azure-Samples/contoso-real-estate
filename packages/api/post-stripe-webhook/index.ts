import { AzureFunction, Context, HttpRequest } from "@azure/functions";
import Stripe from "stripe";
import { getConfig } from "../config";

const postStripeWebhook: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {

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
      const session = event.data.object as Stripe.Checkout.Session;
      context.log.info(`Checkout session completed for ${session.id}`);

      // TODO: Update the reservation status in the database

      break;
    case 'checkout.session.expired':
      const expiredSession = event.data.object as Stripe.Checkout.Session;
      context.log.info(`Checkout session expired for ${expiredSession.id}`);

      // TODO: Update the reservation status in the database

      break;
    case 'payment_intent.succeeded':
      const paymentIntent = event.data.object as Stripe.PaymentIntent;
      context.log.info(`Payment intent succeeded for ${paymentIntent.id}`);

      // TODO: Create payment in database

      break;
    default:
      context.log.info(`Unhandled event type ${event.type}`);
  }

  context.res = {
    status: 201,
  };
};

export default postStripeWebhook;

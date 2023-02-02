import { FastifyPluginAsync } from "fastify"
import Stripe from "stripe";

const stripe: FastifyPluginAsync = async (fastify, opts): Promise<void> => {
  const config = fastify.config;
  const stripe = fastify.stripe;

  fastify.post('/webhook', async function (request, reply) {
    const payload = request.body as any;
    const signature = request.headers['stripe-signature'];
  
    let event;
  
    try {
      event = stripe.webhooks.constructEvent(payload, signature!, config.webhookSecret);
    } catch (error: any) {
      fastify.log.error(`Webhook Error: ${error.message}`);
      reply.statusCode = 400;
      return { error: `Webhook Error: ${error.message}` };
    }
  
    switch (event.type) {
      case 'checkout.session.completed':
        const session = event.data.object as Stripe.Checkout.Session;
        fastify.log.info(`Checkout session completed for ${session.id}`);
  
        // TODO: Update the reservation status in the database
  
        break;
      case 'checkout.session.expired':
        const expiredSession = event.data.object as Stripe.Checkout.Session;
        fastify.log.info(`Checkout session expired for ${expiredSession.id}`);
  
        // TODO: Update the reservation status in the database
  
        break;
      case 'payment_intent.succeeded':
        const paymentIntent = event.data.object as Stripe.PaymentIntent;
        fastify.log.info(`Payment intent succeeded for ${paymentIntent.id}`);
  
        // TODO: Create payment in database
  
        break;
      default:
        fastify.log.info(`Unhandled event type ${event.type}`);
    }
  
    return reply.status(201);
  });

  fastify.post('/checkout', async function (request, reply) {
    // TODO: typing and validation
    const { currencyCode, reservation, amount, paymentName } = request.body as any;
    try {
      const session = await stripe.checkout.sessions.create({
        line_items: [
          {
            price_data: {
              currency: currencyCode,
              product_data: {
                name: paymentName,
                metadata: {
                  userId: reservation.userId,
                  listingId: reservation.listingId,
                  from: reservation.from,
                  ro: reservation.to,
                  guests: reservation.guests,
                },
              },
              tax_behavior: 'inclusive',
              unit_amount: amount,
            },
            quantity: 1,
          },
        ],
        mode: 'payment',
        success_url: `${config.webAppHost}/checkout?result=success`,
        cancel_url: `${config.webAppHost}/checkout?result=cancel`,
      });
      return { sessionUrl: session.url };
    } catch (error: unknown) {
      const err = error as Error;
      fastify.log.error(`Error creating checkout session: ${err.message}`);
      reply.statusCode = 400;
      return { error: "Cannot create checkout session" };
    }
  });
}

export default stripe;

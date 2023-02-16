import { FastifyPluginAsync } from "fastify"
import Stripe from "stripe";
import { Payment } from "../../models/payment";

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
        try {
          const session = event.data.object as Stripe.Checkout.Session;
          fastify.log.info(`Checkout session completed for ${session.id}`);
    
          const payment = {
            userId: session.metadata?.userId,
            reservationId: session.metadata?.reservationId,
            provider: 'stripe' as const,
            status: 'completed' as const,
            amount: Number(session.metadata?.amount),
            currency: session.metadata?.currency,
            createdAt: new Date(),
          };
    
          const paymentRecord = await fastify.api.createPayment(payment) as Payment;
          const message = `Reservation ${session.metadata?.reservationId} completed with payment ${paymentRecord.id}`;
          fastify.log.info(message);
          return { message };

        } catch (error: unknown) {
          const err = error as Error;
          const errorMessage = `Error processing completed checkout session: ${err.message}`;
          fastify.log.error(errorMessage);
          reply.statusCode = 500;
          return { error: errorMessage };
        }
  
      case 'checkout.session.expired':
        try {
          const expiredSession = event.data.object as Stripe.Checkout.Session;
          fastify.log.info(`Checkout session expired for ${expiredSession.id}`);
    
          const reservationId = expiredSession.metadata?.reservationId;
          if (!reservationId) {
            const errorMessage = `No reservationId found for session ${expiredSession.id}`;
            fastify.log.error(errorMessage);
            reply.statusCode = 400;
            return { error: errorMessage };
          }
    
          const reservationRecord = await fastify.api.updateReservationStatus(reservationId, 'cancelled');
          if (!reservationRecord) {
            const errorMessage = `No reservation found for id ${reservationId}`;
            fastify.log.error(errorMessage);
            reply.statusCode = 400;
            return { error: errorMessage };
          }

          const message = `Reservation ${reservationId} cancelled`;
          fastify.log.info(message);
          return { message };

        } catch (error: unknown) {
          const err = error as Error;
          const errorMessage = `Error processing expired checkout session: ${err.message}`;
          fastify.log.error(errorMessage);
          reply.statusCode = 500;
          return { error: errorMessage };
        }

      default:
        const errorMessage = `Unhandled event type ${event.type}`;
        fastify.log.info(errorMessage);
        reply.statusCode = 400;
        return { error: errorMessage };
    }
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

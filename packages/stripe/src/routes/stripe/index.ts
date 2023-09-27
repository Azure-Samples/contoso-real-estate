import { FastifyPluginAsync } from "fastify"
import Stripe from "stripe";
import { Checkout, validateCheckout } from "../../models/checkout.js";
import { Payment } from "../../models/payment.js";
import { HttpError } from "../../plugins/api.js";

const stripe: FastifyPluginAsync = async (fastify, opts): Promise<void> => {
  const config = fastify.config;
  const stripe = fastify.stripe;

  fastify.post('/webhook', { config: { rawBody: true } }, async function (request, reply) {
    const payload = request.rawBody?.toString() as string;
    const signature = request.headers['stripe-signature'] as string;
    let event;

    fastify.log.info(`Webhook received [payload: ${payload}, signature: ${signature}]`);

    if (!stripe) {
      fastify.log.error(`Webhook Error: Stripe not configured`);
      reply.statusCode = 500;
      return { error: `Webhook Error: Stripe not configured` };
    }
  
    try {
      event = stripe.webhooks.constructEvent(payload, signature, config.webhookSecret);
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
          if (error instanceof HttpError) {
            fastify.log.error(error.response);
          }
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

      default: {
        const errorMessage = `Unhandled event type ${event.type}`;
        fastify.log.info(errorMessage);
        reply.statusCode = 400;
        return { error: errorMessage };
      }
    }
  });

  fastify.post('/checkout', async function (request, reply) {
    const checkout = request.body as Checkout;
    fastify.log.info(`Creating checkout session [reservationId: ${checkout?.reservationId}, redirect URL: ${config.webAppUrl}]`);

    try {
      validateCheckout(checkout);
    } catch (error: unknown) {
      const err = error as Error;
      const errorMessage = `Error validating checkout: ${err.message}`;
      fastify.log.error(errorMessage);
      reply.statusCode = 400;
      return { error: errorMessage };
    }

    if (!stripe) {
      fastify.log.warn(`Stripe not configured! Accepting payment and creating reservation directly`);

      const payment = {
        userId: checkout.userId,
        reservationId: checkout.reservationId,
        provider: 'stripe' as const,
        status: 'completed' as const,
        amount: checkout.amount,
        currency: checkout.currency,
        createdAt: new Date(),
      };
      const paymentRecord = await fastify.api.createPayment(payment) as Payment;
      const message = `Reservation ${checkout.reservationId} completed with payment ${paymentRecord.id}`;
      fastify.log.info(message);

      return { sessionUrl: `${config.webAppUrl}/checkout?result=success` };
    }

    try {
      const session = await stripe.checkout.sessions.create({
        line_items: [
          {
            price_data: {
              currency: checkout.currency.toLowerCase(),
              product_data: {
                name: checkout.productName
              },
              tax_behavior: "inclusive",
              unit_amount: checkout.amount,
            },
            quantity: 1,
          },
        ],
        mode: "payment",
        success_url: `${config.webAppUrl}/checkout?result=success`,
        cancel_url: `${config.webAppUrl}/checkout?result=cancel&reservationId=${checkout.reservationId}`,
        client_reference_id: checkout.reservationId,
        metadata: {
          userId: checkout.userId,
          listingId: checkout.listingId,
          reservationId: checkout.reservationId,
          from: checkout.from,
          to: checkout.to,
          guests: checkout.guests,
          currency: checkout.currency,
          amount: checkout.amount,
          createdAt: checkout.createdAt,
        },
        expires_at: Math.round(Date.now() / 1000 + 31 * 60), // 31 minutes session expiration (epoch seconds)
      });
      return { sessionUrl: session.url };

    } catch (error: unknown) {
      const err = error as Error;
      const errorMessage = `Error creating stripe checkout session: ${err.message}`;
      fastify.log.error(errorMessage);
      reply.statusCode = 500;
      return { error: errorMessage };
    }
  });
}

export default stripe;

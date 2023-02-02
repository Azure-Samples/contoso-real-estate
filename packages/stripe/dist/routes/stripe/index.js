import { validateCheckout } from "../../models/checkout";
const stripe = async (fastify, opts) => {
    const config = fastify.config;
    const stripe = fastify.stripe;
    fastify.post('/webhook', async function (request, reply) {
        var _a, _b, _c, _d, _e, _f;
        const payload = request.body;
        const signature = request.headers['stripe-signature'];
        let event;
        try {
            event = stripe.webhooks.constructEvent(payload, signature, config.webhookSecret);
        }
        catch (error) {
            fastify.log.error(`Webhook Error: ${error.message}`);
            reply.statusCode = 400;
            return { error: `Webhook Error: ${error.message}` };
        }
        switch (event.type) {
            case 'checkout.session.completed':
                try {
                    const session = event.data.object;
                    fastify.log.info(`Checkout session completed for ${session.id}`);
                    const payment = {
                        userId: (_a = session.metadata) === null || _a === void 0 ? void 0 : _a.userId,
                        reservationId: (_b = session.metadata) === null || _b === void 0 ? void 0 : _b.reservationId,
                        provider: 'stripe',
                        status: 'completed',
                        amount: Number((_c = session.metadata) === null || _c === void 0 ? void 0 : _c.amount),
                        currency: (_d = session.metadata) === null || _d === void 0 ? void 0 : _d.currency,
                        createdAt: new Date(),
                    };
                    const paymentRecord = await fastify.api.createPayment(payment);
                    const message = `Reservation ${(_e = session.metadata) === null || _e === void 0 ? void 0 : _e.reservationId} completed with payment ${paymentRecord.id}`;
                    fastify.log.info(message);
                    return { message };
                }
                catch (error) {
                    const err = error;
                    const errorMessage = `Error processing completed checkout session: ${err.message}`;
                    fastify.log.error(errorMessage);
                    reply.statusCode = 500;
                    return { error: errorMessage };
                }
            case 'checkout.session.expired':
                try {
                    const expiredSession = event.data.object;
                    fastify.log.info(`Checkout session expired for ${expiredSession.id}`);
                    const reservationId = (_f = expiredSession.metadata) === null || _f === void 0 ? void 0 : _f.reservationId;
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
                }
                catch (error) {
                    const err = error;
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
        const checkout = request.body;
        try {
            validateCheckout(checkout);
        }
        catch (error) {
            const err = error;
            const errorMessage = `Error validating checkout: ${err.message}`;
            fastify.log.error(errorMessage);
            reply.statusCode = 400;
            return { error: errorMessage };
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
                expires_at: Math.round(Date.now() / 1000 + 31 * 60),
            });
            return { sessionUrl: session.url };
        }
        catch (error) {
            const err = error;
            const errorMessage = `Error creating stripe checkout session: ${err.message}`;
            fastify.log.error(errorMessage);
            reply.statusCode = 500;
            return { error: errorMessage };
        }
    });
};
export default stripe;
//# sourceMappingURL=index.js.map
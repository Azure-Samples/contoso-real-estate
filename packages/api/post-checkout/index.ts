import { AzureFunction, Context, HttpRequest } from "@azure/functions";
import Stripe from "stripe";
import { getConfig } from "../config";
import { getListingById } from "../models/listing";
import { createReservationMock } from "../models/reservation";
import { ReservationRequest } from "../models/reservation-request";

const postCheckout: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {

  const config = await getConfig();
  const stripe = new Stripe(config.stripe.secretKey, { apiVersion: '2022-08-01' });
  const reservation = req.body as ReservationRequest;
  const guests = Number(reservation.guests) || 0;
  const from = new Date(reservation.from);
  const to = new Date(reservation.to);
  const now = new Date();

  if (!reservation.userId) {
    context.res = {
      status: 400,
      body: {
        error: "userId must be specified",
      },
    };
    return;
  }
  
  if (!reservation.listingId) {
    context.res = {
      status: 400,
      body: {
        error: "listingId must be specified",
      },
    };
    return;
  }

  const listing = await getListingById({ id: reservation.listingId });

  if (!listing) {
    context.res = {
      status: 404,
      body: {
        error: "listing not found for specified id",
      },
    };
    return;
  }

  if (guests <= 0 || guests > listing.capacity) {
    context.res = {
      status: 400,
      body: {
        error: "Invalid number of guests",
      },
    };
    return;
  }

  if (!reservation.from || from.getTime() < now.getTime()) {
    context.res = {
      status: 400,
      body: {
        error: "Invalid reservation start date",
      },
    };
    return;
  }

  if (!reservation.to || to.getTime() < from.getTime()) {
    context.res = {
      status: 400,
      body: {
        error: "Invalid reservation end date",
      },
    };
    return;
  }
  
  // TODO: check for availability/overlapping reservations

  const total = calculateTotal(listing, guests, from, to);
  const amount = Math.round(total * 100);
  const name = `Booking ${listing.title}`;

  try {
    const session = await stripe.checkout.sessions.create({
      line_items: [
        {
          price_data: {
            currency: listing.fees?.currency.code.toLowerCase(),
            product_data: {
              name,
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
      success_url: `${config.appDomain}/checkout?result=success`,
      cancel_url: `${config.appDomain}/checkout?result=cancel`,
    });

    const pendingReservation = {
      user: {
        id: reservation.userId,
      },
      listing: {
        id: reservation.listingId,
      },
      from,
      to,
      status: "pending",
      createdAt: now,
    };

    await createReservationMock({ reservation: pendingReservation });

    context.res = {
      body: {
        sessionUrl: session.url,
      },
    };
  } catch (error: unknown) {
    const err = error as Error;
    context.log.error(`Error creating checkout session: ${err.message}`);
    context.res = {
      status: 400,
      body: {
        error: "Cannot create checkout session",
      },
    };
  }
};

function getMonths(from: Date, to: Date) {
  if (!from || !to) {
    return 0;
  }
  const days = (to.getTime() - from.getTime()) / 1000 / 60 / 60 / 24;
  return +(days / 30).toFixed(2);
}

// TODO: add listing type
function calculateTotal(listing: any, guests: number, from: Date, to: Date): number {
  const months = getMonths(from, to);
  const monthlyRentPrice = listing.fees?.rent || 0;
  const monthlyRentPriceWithDiscount = Math.max(0, monthlyRentPrice * (1 - (listing.fees?.discount || 0) / 100));
  const total = months * monthlyRentPriceWithDiscount + (listing.fees?.cleaning || 0) + (listing.fees?.service || 0) + (listing.fees?.occupancy || 0);
  return total;
}

export default postCheckout;

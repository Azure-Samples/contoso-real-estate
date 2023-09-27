import { HttpRequest, HttpResponseInit, InvocationContext } from "@azure/functions";
import { getConfig, initializeDatabaseConfiguration } from "../config";
import { ReservationRequest } from "../models/reservation-request";
import { getListingById } from "../models/listing";
import {
  findReservationsByListingIdAndDateRange,
  saveReservation,
  updateReservationStatus,
} from "../models/reservation";
import { Listing } from "../models/listing.schema";

// POST: Checkout
export async function postCheckout(request: HttpRequest, context: InvocationContext): Promise<HttpResponseInit> {
  context.log(`Http function postCheckout processed request for url "${request.url}"`);

  await initializeDatabaseConfiguration();

  const config = await getConfig();
  const reservation = (await request.json()) as ReservationRequest;
  const guests = Number(reservation.guests) || 0;

  const from = new Date(reservation.from);
  const to = new Date(reservation.to);
  const now = localeDateToUTCDate(new Date());

  if (!reservation.userId) {
    return {
      status: 400,
      jsonBody: {
        error: "User ID is required",
      },
    };
  }

  if (!reservation.listingId) {
    return {
      status: 400,
      jsonBody: {
        error: "Listing ID is required",
      },
    };
  }

  const listing = await getListingById({ id: reservation.listingId });

  if (!listing) {
    return {
      status: 404,
      jsonBody: {
        error: "Listing not found for specified id",
      },
    };
  }

  if (guests <= 0 || guests > listing.capacity) {
    context.error(`Invalid number of guests: ${guests} (listing capacity: ${listing.capacity})`);
    return {
      status: 400,
      jsonBody: {
        error: "Invalid number of guests",
      },
    };
  }

  if (!reservation.from || from.getTime() < now.getTime()) {
    context.error(
      `Invalid reservation start date: ${reservation.from} (resolved: ${from.toISOString()}, now: ${now.toISOString()}`,
    );
    return {
      status: 400,
      jsonBody: {
        error: "Invalid reservation start date",
      },
    };
  }

  if (!reservation.to || to.getTime() <= from.getTime()) {
    context.error(
      `Invalid reservation end date: ${reservation.to} (resolved: ${to.toISOString()}, from: ${from.toISOString()}`,
    );
    return {
      status: 400,
      jsonBody: {
        error: "Invalid reservation end date",
      },
    };
  }

  const overlaps = await findReservationsByListingIdAndDateRange(listing.id, from.toISOString(), to.toISOString());

  if (overlaps.length > 0) {
    return {
      status: 400,
      jsonBody: {
        error: `Reservation overlaps with existing reservation(s): ${overlaps
          .map(o => o.id)
          .join(", ")} (from: ${from.toISOString()}, to: ${to.toISOString()})`,
      },
    };
  }

  const total = calculateTotal(listing, guests, from, to);
  const amount = Math.round(total * 100);
  const name = `Booking ${listing.title}`;
  let reservationRecord;

  try {
    const currency = listing.fees[5].split(":")[0];

    const pendingReservation = {
      userId: reservation.userId,
      listingId: reservation.listingId,
      title: listing.title,
      guests,
      from,
      to,
      status: "pending" as const,
      createdAt: now,
    };

    reservationRecord = await saveReservation(pendingReservation);

    try {
      const checkout = {
        productName: name,
        reservationId: reservationRecord.id,
        userId: reservation.userId,
        listingId: reservation.listingId,
        guests,
        from: from.toISOString(),
        to: to.toISOString(),
        currency: currency.toLowerCase(),
        amount,
        createdAt: now.toISOString(),
      };

      const response = await fetch(config.stripeServiceUrl + "/stripe/checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(checkout),
      });

      if (!response.ok) {
        const error = await response.text();
        throw new Error(error);
      }

      const { sessionUrl } = (await response.json()) as any;

      return {
        jsonBody: {
          sessionUrl,
        },
      };
    } catch (error: unknown) {
      const err = error as Error;
      context.error(`Error creating checkout session: ${err.message}`);
      await updateReservationStatus(reservationRecord.id, "cancelled");
      throw error;
    }
  } catch (error: unknown) {
    const err = error as Error;
    context.error(`Error creating checkout session: ${err.message}`);
    return {
      status: 500,
      jsonBody: {
        error: "Cannot create checkout session",
      },
    };
  }

  function getMonths(from: Date, to: Date) {
    if (!from || !to) {
      return 0;
    }
    const days = (to.getTime() - from.getTime()) / 1000 / 60 / 60 / 24;
    return +(days / 30).toFixed(2);
  }

  function calculateTotal(listing: Listing, guests: number, from: Date, to: Date): number {
    const months = getMonths(from, to);
    const monthlyRentPrice = Number(listing.fees[4]) || 0;
    const monthlyRentPriceWithDiscount = Math.max(
      0,
      monthlyRentPrice * (1 - (parseInt(listing?.fees?.[4], 10) || 0) / 100),
    );
    const cleaning = Number(listing.fees[0]) || 0;
    const service = Number(listing.fees[1]) || 0;
    const occupancy = (Number(listing.fees[2]) || 0) * guests;
    const total = months * monthlyRentPriceWithDiscount + cleaning + service + occupancy;
    return total;
  }

  // We're only interested in the date day relative to the current timezone,
  // so we need to convert the date to UTC to avoid any timezone offset
  function localeDateToUTCDate(date: Date) {
    const utc = Date.UTC(date.getFullYear(), date.getMonth(), date.getDate());
    return new Date(utc);
  }
}

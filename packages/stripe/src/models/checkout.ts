export interface Checkout {
  productName: string;
  userId: string;
  listingId: string;
  reservationId: string;
  from: string;
  to: string;
  guests: number;
  currency: string;
  amount: number;
  createdAt: string;
}

export function validateCheckout(checkout: Checkout): void {
  if (!checkout.productName) {
    throw new Error("Missing productName");
  }
  if (!checkout.userId) {
    throw new Error("Missing userId");
  }
  if (!checkout.listingId) {
    throw new Error("Missing listingId");
  }
  if (!checkout.reservationId) {
    throw new Error("Missing reservationId");
  }
  if (!checkout.from) {
    throw new Error("Missing from");
  }
  if (!checkout.to) {
    throw new Error("Missing to");
  }
  if (!checkout.guests) {
    throw new Error("Missing guests");
  }
  const guests = Number(checkout.guests);
  if (isNaN(guests) || guests < 1) {
    throw new Error("Invalid guests number");
  }
  if (!checkout.currency) {
    throw new Error("Missing currency");
  }
  if (!checkout.amount) {
    throw new Error("Missing amount");
  }
  const amount = Number(checkout.amount);
  if (isNaN(amount) || amount < 0) {
    throw new Error("Invalid amount number");
  }
  if (!checkout.createdAt) {
    throw new Error("Missing createdAt");
  }
}

import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class ListingService {
  constructor() {}

  async getListings() {
    const resource = await fetch("/api/listings");
    const { listings } = await resource.json();
    return listings;
  }

  async getListingBySlug(slug: string): Promise<Listing | undefined> {
    const resource = await fetch(`/api/listings/${slug}`);
    if (resource.status === 200) {
      return await resource.json();
    }
    return undefined;
  }

  async bookmark(listing: Listing) {
    alert("Not implemented!");
  }

  async share(listing: Listing) {
    alert("Not implemented!");
  }

  async reserve(reservationDetails: Reservation): Promise<CheckoutSession> {
    const resource = await fetch(`/api/checkout`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        },
        body: JSON.stringify(reservationDetails),
    });
    const checkoutSession = await resource.json();
    if (resource.status !== 200) {
      throw new Error(checkoutSession.error);
    }
    return checkoutSession;
  }
}

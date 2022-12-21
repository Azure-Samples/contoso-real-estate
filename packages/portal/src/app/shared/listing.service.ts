import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class ListingService {

  async getListings({limit = 10, offset = 0} = {}): Promise<Listing[]> {
    const resource = await fetch(`/api/listings?limit=${limit}&offset=${offset}`);
    const { listings } = await resource.json();
    return listings;
  }

  async getFeaturedListings({limit = 10, offset = 0} = {}): Promise<Listing[]> {
    // TODO: prevent loading the same listings multiple times when we hit the end of the list
    const resource = await fetch(`/api/listings?limit=${limit}&offset=${offset}&featured=true`);
    const { listings } = await resource.json();
    return listings || [];
  }

  async getListingBySlug(slug: string): Promise<Listing | undefined> {
    const resource = await fetch(`/api/listings/${slug}`);
    if (resource.status === 200) {
      return await resource.json();
    }
    return undefined;
  }


  // eslint-disable-next-line @typescript-eslint/no-unused-vars
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

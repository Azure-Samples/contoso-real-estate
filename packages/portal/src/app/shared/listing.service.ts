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

  async getListingBySlug(slug: string): Promise<Listing> {
    const resource = await fetch(`/api/listings/${slug}`);
    return await resource.json();
  }

  async bookmark(listing: Listing) {
    alert("Not implemented!");
  }

  async share(listing: Listing) {
    alert("Not implemented!");
  }

  async reserve(reservationDetails: Reservation) {
    alert("Not implemented!");
  }
}

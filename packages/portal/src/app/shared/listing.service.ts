import { Injectable, inject } from "@angular/core";
import { WindowService } from "../core/window/window.service";

@Injectable({
  providedIn: "root",
})
export class ListingService {
  private windowService = inject(WindowService);

  async getListings({ limit = 10, offset = 0 } = {}): Promise<Listing[]> {
    const resource = await fetch(`/api/listings?limit=${limit}&offset=${offset}`).then(response => {
      if (response.status === 200) {
        return response.json();
      }
      throw new Error("Error while fetching all listings");
    });
    return resource;
  }

  async getFeaturedListings({ limit = 10, offset = 0 } = {}): Promise<Listing[]> {
    // TODO: prevent loading the same listings multiple times when we hit the end of the list
    const resource = await fetch(`/api/listings?limit=${limit}&offset=${offset}&featured=true`).then(response => {
      if (response.status === 200) {
        return response.json();
      }
      throw new Error("Error while fetching featured listings");
    });
    return resource;
  }

  async getListingById(id: string): Promise<Listing | undefined> {
    const resource = await fetch(`/api/listings/${id}`).then(response => {
      if (response.status === 200) {
        return response.json();
      }
      throw new Error("Error while fetching requested listing");
    });
    return resource;
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async share(platform: string, listing: Listing) {
    const rent = listing.fees.at(0);
    const currency = listing.fees.at(-1);
    const currentWindowUrl = window.location.href;
    const socialMediaUrls = {
      twitter : `http://twitter.com/share?text=Checkout+this+cool+apartment+I+found+in+${listing.address.at(
        4,
      )}+on+Contoso+Rental+at+${currency}${rent}/month` + `&url=` + currentWindowUrl + `&hashtags=renting,apartment`,
      facebook : `https://www.facebook.com/sharer/sharer.php?title=Checkout+this+cool+apartment+I+found+in+${listing.address.at(
        4,
      )}+on+Contoso+Rental+at+${currency}${rent}/month` + `&u=` + currentWindowUrl,
    };
    const { twitter, facebook } = socialMediaUrls;
    if (platform && platform === "facebook"){
      const shareUrl = facebook;
      this.windowService
        .nativeWindow()
        .open(shareUrl);
    }
    else if (platform && platform === "twitter"){
      const shareUrl = twitter;
      this.windowService
      .nativeWindow()
      .open(shareUrl);
    }
  }

  async reserve(reservationDetails: ReservationRequest): Promise<CheckoutSession> {
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

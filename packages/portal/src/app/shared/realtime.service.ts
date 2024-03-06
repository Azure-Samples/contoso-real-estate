import { Injectable } from "@angular/core";
import * as sioClient from "socket.io-client";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: "root",
})
export class RealtimeService {
  client: sioClient.Socket | null = null;

  constructor() {
    if (environment.notificationUrl && environment.notificationPath) {
      this.client = sioClient.io(environment.notificationUrl, {
        path: environment.notificationPath,
      });
    } else {
      console.warn("RealtimeService: Notification URL or Path is not set. Please check environment.ts file.");
    }
  }

  broadcastFavouriteNotification(listing: Listing) {
    if (this.client) {
      this.client.emit("sendFavourite", listing.title);
    }
  }

  broadcastCheckoutNotification(listing: Listing, from: string, to: string) {
    if (this.client) {
      this.client.emit("sendCheckout", listing, from, to);
    }
  }

  getNotifiedForFavourite(notifyAction: (listingTitle: string) => void | Promise<void>) {
    if (this.client) {
      this.client.on("notifyFavourite", async (listingTitle: string) => {
        await notifyAction(listingTitle);
      });
    }
  }

  getNotifiedForCheckout(notifyAction: (listing: Listing, from: string, to: string) => void | Promise<void>) {
    if (this.client) {
      this.client.on("notifyCheckout", async (listing: Listing, from: string, to: string) => {
        await notifyAction(listing, from, to);
      });
    }
  }
}

import { Injectable } from "@angular/core";
import * as sioClient from "socket.io-client";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: "root",
})
export class RealtimeService {
  client = {} as sioClient.Socket;

  constructor() {

    if (!environment.notificationUrl || !environment.notificationPath) {
      // TODO: disable this feature at the injector level if the URL or Path is not set.
      alert("RealtimeService: Notification URL or Path is not set. Please check environment.ts file.");
    }

    this.client = sioClient.io(environment.notificationUrl, {
      path: environment.notificationPath,
    });
  }

  broadcastFavouriteNotification(listing: Listing) {
    this.client.emit("sendFavourite", listing.title);
  }

  broadcastCheckoutNotification(listing: Listing, from: string, to: string) {
    this.client.emit("sendCheckout", listing, from, to);
  }
  
  getNotifiedForFavourite(notifyAction: (listingTitle: string) => void | Promise<void>) {
    this.client.on("notifyFavourite", async (listingTitle: string) => {
      await notifyAction(listingTitle);
    });
  }

  getNotifiedForCheckout(notifyAction: (listing: Listing, from: string, to: string) => void | Promise<void>) {
    this.client.on("notifyCheckout", async (listing: Listing, from: string, to: string) => {
      await notifyAction(listing, from, to);
    });
  }
}

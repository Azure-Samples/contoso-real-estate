import { Injectable } from "@angular/core";
import { UserRole } from "./user/user.service";
import * as sioClient from "socket.io-client";
import { MatSnackBar } from '@angular/material/snack-bar';


@Injectable({
  providedIn: "root",
})
export class RealtimeService {
  public client = {} as sioClient.Socket;

  constructor() {
    this.client = sioClient.io("https://sio-prod-eastus.webpubsub.azure.com", {
        path: "/clients/socketio/hubs/eio_hub",
    });
  }

  broadcastFavouriteNotification(listing: Listing) {
    this.client.emit("sendFavourite", listing.title);
  }

  broadcastCheckoutNotification(listing: Listing, from: string, to: string) {
    this.client.emit("sendCheckout", listing, from, to);
  }
}

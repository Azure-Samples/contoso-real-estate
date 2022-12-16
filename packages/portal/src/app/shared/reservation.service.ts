import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class ReservationService {
  constructor() {}

  async reserve(reservationDetails: Reservation) {
    alert("Not implemented!");
  }
}

import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class ReservationService {
  async getReservationsByUser(user: User, { limit = 10, offset = 0 } = {}): Promise<Reservation[]> {
    const response = await fetch(`/api/reservations?userId=${user.id}&limit=${limit}&offset=${offset}`);
    if (response.status === 200) {
      return (await response.json()).reservations;
    }
    throw new Error("Error while fetching reservations");
  }

  async cancelReservation(reservationId: string): Promise<void> {
    const response = await fetch(`/api/reservations/${reservationId}`, {
      method: "PATCH",
      body: JSON.stringify({ status: "cancelled" }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (response.status !== 200) {
      throw new Error("Error while cancelling reservation");
    }
  }
}

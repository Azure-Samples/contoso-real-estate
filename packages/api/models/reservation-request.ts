export interface ReservationRequest {
  userId: string;
  listingId: string;
  from: string;
  to: string;
  guests: number;
}

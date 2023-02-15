import ReservationModel, { Reservation } from "./reservation.schema";

export async function saveReservation(reservation: Partial<Reservation>): Promise<Reservation> {
  return ReservationModel.create(reservation);
}

export async function updateReservationStatus(id: string, status: "pending" | "active" | "cancelled" | "archived"): Promise<Reservation | null> {
  const record = await ReservationModel.findOne({ id });
  if (record) {
    record.status = status;
    return await record.save();
  }
  return null;
}

export async function findReservationById(id: string): Promise<Reservation | null> {
  return await ReservationModel.findOne({ id });
}

export async function findReservationsByUserId(userId: string, offset: number, limit: number): Promise<Reservation[]> {
  return await ReservationModel
    .find({ userId })
    .skip(offset)
    .limit(limit);
}

export async function findReservationsByListingIdAndDateRange(listingId: string, from: string, to: string): Promise<Reservation[]> {
  return await ReservationModel.find({
    listingId,
    from: { $lte: new Date(to).toISOString() },
    to: { $gte: new Date(from).toISOString() },
  });
}

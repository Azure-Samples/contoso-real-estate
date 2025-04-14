import ReservationModel, { Reservation } from "./reservation.schema";
import { ReservationStatus } from "./reservation-status";

export async function saveReservation(reservation: Partial<Reservation>): Promise<Reservation> {
  return ReservationModel.create(reservation);
}

export async function updateReservationStatus(id: string, status: ReservationStatus): Promise<Reservation | null> {
  const record = await ReservationModel.findOne({ _id: id });
  if (record) {
    if (
      (status === ReservationStatus.Active && record.status !== ReservationStatus.Pending) ||
      (status === ReservationStatus.Cancelled && record.status !== ReservationStatus.Pending)
    
    ) {
      throw new Error(`Invalid reservation status transition: ${record.status} -> ${status}`);
    }

    record.status = status;
    return await record.save();
  }
  return null;
}

export async function findReservationById(id: string): Promise<Reservation | null> {
  return await ReservationModel.findOne({ _id: id });
}

export async function findReservationsByUserId(userId: string, offset: number, limit: number): Promise<Reservation[]> {
  return await ReservationModel.find({ userId }).skip(offset).limit(limit).sort({ _id: -1 });
}

export async function findReservationsByListingIdAndDateRange(
  listingId: string,
  from: string,
  to: string,
): Promise<Reservation[]> {
  return await ReservationModel.find({
    listingId,
    status: { $in: ["pending", "active"] },
    from: { $lt: new Date(to).toISOString() },
    to: { $gt: new Date(from).toISOString() },
  });
}

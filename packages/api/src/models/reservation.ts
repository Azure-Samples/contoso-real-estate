import mongoose from "mongoose";
import ReservationModel, { Reservation } from "./reservation.schema";
import { ReservationStatus } from "./reservation-status";

export async function saveReservation(reservation: Partial<Reservation>): Promise<Reservation> {
  return ReservationModel.create(reservation);
}

export async function updateReservationStatus(
  id: string,
  status: ReservationStatus,
): Promise<Reservation | null> {
  const reservation = await ReservationModel.findById(id);

  if (!reservation) {
    return null;
  }

  if (
    (status === ReservationStatus.Active && reservation.status !== ReservationStatus.Pending) ||
    (status === ReservationStatus.Cancelled && reservation.status !== ReservationStatus.Pending)
  ) {
    throw new Error(`Invalid reservation status transition: ${reservation.status} -> ${status}`);
  }

  reservation.status = status;
  return await reservation.save();
}

export async function findReservationById(id: string): Promise<Reservation | null> {
  try {
    const reservationId = new mongoose.Types.ObjectId(id);
    return await ReservationModel.findOne({ _id: reservationId });
  } catch (error) {
    return null;
  }
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

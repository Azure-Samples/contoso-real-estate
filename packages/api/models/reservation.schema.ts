import { ObjectId } from "mongodb";
import { model, Schema } from "mongoose";

export interface Reservation {
  _id: ObjectId;
  id: string;
  userId: string;
  listingId: string;
  from: Date;
  to: Date;
  status: "pending" | "active" | "cancelled" | "archived";
  createdAt: Date;
}

const ReservationSchema = new Schema<Reservation>({
  id: {
    type: String,
    required: true,
    unique: true,
  },
  userId: {
    type: String,
    required: true,
  },
  listingId: {
    type: String,
    required: true,
  },
  from: {
    type: Date,
    required: true,
  },
  to: {
    type: Date,
    required: true,
  },
  status: {
    type: String,
    required: true,
    enum: ["pending", "active", "cancelled", "archived"],
  },
  createdAt: {
    type: Date,
    required: true,
  },
});

export default model<Reservation>("Reservation", ReservationSchema);

import { model, Schema } from "mongoose";
import { Reservation } from "../interface/models";

const ReservationSchema = new Schema<Reservation>({
  userId: {
    type: String,
    required: true,
    index: true,
  },
  listingId: {
    type: String,
    required: true,
    index: true,
  },
  title: {
    type: String,
    required: true,
  },
  guests: {
    type: Number,
    required: true,
  },
  from: {
    type: Date,
    required: true,
    index: true,
  },
  to: {
    type: Date,
    required: true,
    index: true,
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

ReservationSchema.set("toJSON", {
  virtuals: true,
});

export default model<Reservation>("Reservation", ReservationSchema);

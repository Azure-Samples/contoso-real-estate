/**
 * file: packages/api-v4/src/models/reservation.schema.ts
 * description: file responsible for the 'Reservation' mongoose schema
 * data: 07/26/2023
 * author: Glaucia Lemos
 * documentation reference: https://mongoosejs.com/docs/typescript.html
 */

import { model, Schema } from 'mongoose';

export interface Reservation {
  id: string;
  userId: string;
  listingId: string;
  title: string;
  guests: number;
  from: Date;
  to: Date;
  status: "pending" | "active" | "cancelled" | "archived";
  createdAt: Date;
}

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
    enum: ['pending', 'active', 'cancelled', 'archived'],
  },
  createdAt: {
    type: Date,
    required: true,
  },
});

ReservationSchema.set('toJSON', {
  virtuals: true,
});

export default model<Reservation>('Reservation', ReservationSchema);


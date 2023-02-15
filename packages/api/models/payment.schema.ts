import { ObjectId } from "mongodb";
import { model, Schema } from "mongoose";

export interface Payment {
  _id: ObjectId;
  id: string;
  userId: string;
  reservationId: string;
  provider: 'stripe' | 'paypal';
  status: 'pending' | 'declined' | 'completed' | 'cancelled';
  amount: number;
  currency: string;
  createdAt: Date;
}

const PaymentSchema = new Schema<Payment>({
  id: {
    type: String,
    required: true,
    unique: true,
  },
  userId: {
    type: String,
    required: true,
  },
  reservationId: {
    type: String,
    required: true,
  },
  provider: {
    type: String,
    required: true,
    enum: ['stripe', 'paypal'],
  },
  status: {
    type: String,
    required: true,
    enum: ['pending', 'declined', 'completed', 'cancelled'],
  },
  amount: {
    type: Number,
    required: true,
  },
  currency: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    required: true,
  },
});

export default model<Payment>("Payment", PaymentSchema);

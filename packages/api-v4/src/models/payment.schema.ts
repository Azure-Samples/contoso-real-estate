/**
 * file: packages/api-v4/src/models/payment.schema.ts
 * description: file responsible for the 'Payment' mongoose schema
 * data: 07/18/2023
 * author: Glaucia Lemos
 * documentation reference: https://mongoosejs.com/docs/typescript.html
 */

import { model, Schema, InferSchemaType } from 'mongoose';

const PaymentSchema = new Schema({
  userId: {
    type: String,
    required: true,
    index: true,
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
  }
});

PaymentSchema.set('toJSON', {
  virtuals: true,
});

type Payment = InferSchemaType<typeof PaymentSchema>;

const PaymentModel = model('Payment', PaymentSchema);

export {
  Payment,
  PaymentModel
};

import mongoose from "mongoose";
import PaymentModel, { Payment } from "./payment.schema";

export async function savePayment(payment: Partial<Payment>): Promise<Payment> {
  return PaymentModel.create(payment);
}

export async function updatePaymentStatus(
  id: string,
  status: "pending" | "declined" | "completed" | "cancelled",
): Promise<Payment | null> {
  const payment = await PaymentModel.findOne({ _id: id });

  if (!payment) {
    return null;
  }

  payment.status = status;
  return await payment.save();
}

export async function findPaymentById(id: string): Promise<Payment | null> {
  try {
    const paymentId = new mongoose.Types.ObjectId(id);
    return await PaymentModel.findOne({ _id: paymentId });
  } catch (error) {
    return null;
  }
}

export async function findPaymentsByUserId(userId: string, offset: number, limit: number): Promise<Payment[]> {
  return await PaymentModel.find({ userId }).skip(offset).limit(limit).sort({ _id: -1 });
}

export function isValidPayment(payment: Payment): boolean {
  // Check if properties are not undefined
  if (
    payment.userId === undefined ||
    payment.reservationId === undefined ||
    payment.provider === undefined ||
    payment.status === undefined ||
    payment.amount === undefined ||
    payment.currency === undefined
  ) {
    return false;
  }

  // Check if the userId and reservationId are non-empty strings
  if (
    typeof payment.userId !== "string" ||
    payment.userId.trim() === "" ||
    typeof payment.reservationId !== "string" ||
    payment.reservationId.trim() === ""
  ) {
    return false;
  }

  // Check if the amount is a positive number
  if (typeof payment.amount !== "number" || payment.amount <= 0) {
    return false;
  }

  // If all checks pass, return true
  return true;
}

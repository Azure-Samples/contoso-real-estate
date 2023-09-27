import PaymentModel, { Payment } from "./payment.schema";

export async function savePayment(payment: Partial<Payment>): Promise<Payment> {
  return PaymentModel.create(payment);
}

export async function updatePaymentStatus(
  id: string,
  status: "pending" | "declined" | "completed" | "cancelled",
): Promise<Payment | null> {
  const record = await PaymentModel.findOne({ _id: id });
  if (record) {
    record.status = status;
    return await record.save();
  }
  return null;
}

export async function findPaymentById(id: string): Promise<Payment | null> {
  return await PaymentModel.findOne({ _id: id });
}

export async function findPaymentsByUserId(userId: string, offset: number, limit: number): Promise<Payment[]> {
  return await PaymentModel.find({ userId }).skip(offset).limit(limit).sort({ _id: -1 });
}

import mongoose, { Schema } from 'mongoose';
import { Payment } from './paymentSchema';

const PaymentSchema = new Schema<Payment & Document>({
  order_id: { type: String, required: true },
  amount: { type: Number, required: true },
  payment_method: { type: String, required: true },
  payment_status: { type: String, required: true },
});

export const PaymentModel = mongoose.model<Payment & Document>('Payment', PaymentSchema);

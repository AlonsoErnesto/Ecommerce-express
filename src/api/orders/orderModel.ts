import mongoose, { Schema } from 'mongoose';
import { Order } from './orderSchema';

const OrderSchema = new Schema<Order & Document>({
  user_id: { type: String, required: true },
  status: { type: String, required: true, default: 'pending' },
  total_amount: { type: Number, required: true },
  shoppinh_address: { type: String, required: true },
  payment_method: { type: String, required: true },
});

export const OrderModel = mongoose.model<Order & Document>('Order', OrderSchema);

import mongoose, { Schema } from 'mongoose';
import type { OrderItem } from './orderItemSchema';

const OrdenItemSchema = new Schema<OrderItem & Document>({
  order_id: { type: String, required: true },
  product_id: { type: String, required: true },
  quantity: { type: Number, required: true },
  price: { type: Number, required: true },
  size: { type: String, required: true },
  color: { type: String, required: true },
  total: { type: Number, required: true },
});

export const OrderItemModel = mongoose.model<OrderItem & Document>(
  'OrderItem',
  OrdenItemSchema,
);

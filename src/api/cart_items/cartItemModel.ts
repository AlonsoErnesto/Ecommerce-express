import mongoose, { Schema } from 'mongoose';
import { CartItem } from './cartItemSchema';

const CartItemSchema = new Schema<CartItem & Document>({
  cart_id: { type: String, required: true },
  product_id: { type: String, required: true },
  quantity: { type: Number, required: true },
  size: { type: String, required: true },
  color: { type: String, required: true },
});

export const CartItemModel = mongoose.model<CartItem & Document>('CartItem', CartItemSchema);

import mongoose, { Schema } from 'mongoose';
import { Cart } from './cartSchema';

const CartSchema = new Schema<Cart & Document>({
  user_id: { type: String, required: true },
});

export const CartModel = mongoose.model<Cart & Document>('Cart', CartSchema);

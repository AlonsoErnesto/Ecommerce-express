import mongoose, { Schema } from 'mongoose';
import type { Inventory } from './inventorySchema';

const InventorySchema = new Schema<Inventory & Document>({
  product_id: { type: String, required: true },
  size: { type: String, required: true },
  color: { type: String, required: true },
  quantity: { type: Number, required: true },
});

export const InventoryModel = mongoose.model<Inventory & Document>(
  'Inventory',
  InventorySchema,
);

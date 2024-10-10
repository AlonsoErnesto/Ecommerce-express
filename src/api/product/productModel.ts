import mongoose, { type Document, Schema } from 'mongoose';
import type { Product } from './productSchema';

const ProductSchema = new Schema<Product & Document>(
  {
    name: { type: String, required: true },
    description: { type: String },
    price: { type: Number, required: true },
    inStock: { type: Boolean, default: true },
    category: [
      { type: Schema.Types.ObjectId, ref: 'Category', required: true },
    ], // Referencia a Category
    brand: [{ type: Schema.Types.ObjectId, ref: 'Brand', required: true }], // Referencia a Brand
    size: { type: String, required: true },
    color: { type: String, required: true },
    image_url: { type: [String], required: true },
  },
  { timestamps: true },
);

export const ProductModel = mongoose.model<Product & Document>(
  'Product',
  ProductSchema,
);

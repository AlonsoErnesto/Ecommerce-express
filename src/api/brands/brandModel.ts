import mongoose, { type Document, Schema } from 'mongoose';
import type { Brand } from './brandSchema';

const BrandSchema = new Schema<Brand & Document>({
  name: { type: String, required: true },
  description: { type: String },
  logo_url: { type: String, required: true },
});

export const BrandModel = mongoose.model<Brand & Document>(
  'Brand',
  BrandSchema,
);

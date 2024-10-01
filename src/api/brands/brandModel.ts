import mongoose, { Document, Schema } from 'mongoose';
import { Brand } from './brandSchema';

const BrandSchema = new Schema<Brand & Document>({
  name: { type: String, required: true },
  description: { type: String },
  logo_url: { type: String, required: true },
});

export const BrandModel = mongoose.model<Brand & Document>('Brand', BrandSchema);

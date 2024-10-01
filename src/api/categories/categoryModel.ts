import mongoose, { Schema } from 'mongoose';
import { Category } from './categorySchema';
import { Document } from 'mongoose';

const CategorySchema = new Schema<Category & Document>({
  name: { type: String, required: true },
  description: { type: String },
});

export const CategoryModel = mongoose.model<Category & Document>('Category', CategorySchema);

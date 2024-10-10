import type { Document } from 'mongoose';
import mongoose, { Schema } from 'mongoose';
import type { Category } from './categorySchema';

const CategorySchema = new Schema<Category & Document>({
  name: { type: String, required: true },
  description: { type: String },
});

export const CategoryModel = mongoose.model<Category & Document>(
  'Category',
  CategorySchema,
);

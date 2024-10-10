import mongoose, { Schema } from 'mongoose';
import type { Admin } from './adminSchema';

const AdminSchema = new Schema<Admin & Document>(
  {
    name: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    role: { type: String, enum: ['user', 'admin'], default: 'admin' },
    password: { type: String, required: true },
  },
  {
    timestamps: true,
  },
);

export const AdminModel = mongoose.model<Admin & Document>(
  'Admin',
  AdminSchema,
);

import mongoose, { Schema } from 'mongoose';
import type { Client } from './clientSchema';

const ClientSchema = new Schema<Client & Document>(
  {
    name: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    role: { type: String, enum: ['user', 'admin'], default: 'user' },
    password: { type: String, required: true },
  },
  {
    timestamps: true,
  },
);

export const ClientModel = mongoose.model<Client & Document>(
  'Client',
  ClientSchema,
);

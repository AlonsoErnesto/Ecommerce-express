import mongoose, { Schema } from 'mongoose';
import { User } from './userSchema';

const UserSchema = new Schema<User & Document>(
  {
    name: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    role: { type: String, enum: ['user', 'admin'], default: 'user' },
    password: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

export const UserModel = mongoose.model<User & Document>('User', UserSchema);

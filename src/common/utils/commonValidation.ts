import mongoose from 'mongoose';
import { z } from 'zod';

export const commonValidations = {
  id: z.string().refine((data) => mongoose.Types.ObjectId.isValid(data), {
    message: 'ID must be a valid MongoDB ObjectId',
  }),
};

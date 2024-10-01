import { z } from 'zod';

export const CartSchema = z.object({
  user_id: z.string().uuid('User ID must be a valid UUID'),
});

export type Cart = z.infer<typeof CartSchema>;

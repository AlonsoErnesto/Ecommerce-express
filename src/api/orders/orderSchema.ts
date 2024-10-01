import { z } from 'zod';

export const OrderSchema = z.object({
  user_id: z.string().uuid('User ID must be a valid UUID'),
  status: z.string().min(1, 'Status is required').default('pending'), // pending, paid, shipped, delivered, cancelled
  total_amount: z.number().positive('Total amount must be a positive number'),
  shoppinh_address: z.string().min(1, 'Shopping address is required'),
  payment_method: z.string().min(1, 'Payment method is required'),
});
export type Order = z.infer<typeof OrderSchema>;

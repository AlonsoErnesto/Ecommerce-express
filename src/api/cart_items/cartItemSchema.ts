import { z } from 'zod';

export const CartItemSchema = z.object({
  cart_id: z.string().uuid('Cart ID must be a valid UUID'),
  product_id: z.string().uuid('Product ID must be a valid UUID'),
  quantity: z.number().positive('Quantity must be a positive number'),
  size: z.string().min(1, 'Size is required'),
  color: z.string().min(1, 'Color is required'),
});

export type CartItem = z.infer<typeof CartItemSchema>;

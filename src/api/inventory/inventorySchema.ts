import { z } from 'zod';

export const InventorySchema = z.object({
  product_id: z.string().uuid('Product ID must be a valid UUID'),
  size: z.string().min(1, 'Size is required'), // XS, S, M, L, XL, XXL
  color: z.string().min(1, 'Color is required'),
  quantity: z.number().positive('Quantity must be a positive number'),
});

export type Inventory = z.infer<typeof InventorySchema>;

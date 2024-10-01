import { z } from 'zod';

export const OrderItemSchema = z.object({
  order_id: z.string().uuid('Order ID must be a valid UUID'),
  product_id: z.string().uuid('Product ID must be a valid UUID'),
  quantity: z.number().positive('Quantity must be a positive number'),
  price: z.number().positive('Price must be a positive number'),
  size: z.string().min(1, 'Size is required'),
  color: z.string().min(1, 'Color is required'),
  total: z.number().positive('Total must be a positive number'), // precio total de la compra
});

export type OrderItem = z.infer<typeof OrderItemSchema>;

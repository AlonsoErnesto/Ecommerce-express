import { z } from 'zod';

export const PaymentSchema = z.object({
  order_id: z.string().uuid('Order ID must be a valid UUID'),
  amount: z.number().positive('Amount must be a positive number'),
  payment_method: z.string().min(1, 'Payment method is required'), // tarjeta de crédito, tarjeta de débito, etc.payment_method
  payment_status: z.string().min(1, 'Payment status is required'), // pending, success, failure
});

export type Payment = z.infer<typeof PaymentSchema>;

import { z } from 'zod';

export const BrandSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  description: z.string().optional(),
  logo_url: z.string().url('Logo URL must be a valid URL'),
});

export type Brand = z.infer<typeof BrandSchema>;

import { commonValidations } from '@/common/utils/commonValidation';
import { extendZodWithOpenApi } from '@asteasolutions/zod-to-openapi';
import { z } from 'zod';

extendZodWithOpenApi(z);

export const ClientSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Email is invalid'),
  role: z.enum(['user', 'admin']).default('user'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
});

export const ClientWithSchema = ClientSchema.extend({
  _id: z.string(),
});

export const GetClientSchema = z.object({
  params: z.object({ id: commonValidations.id }),
});

export type Client = z.infer<typeof ClientSchema>;
export type ClientWithId = z.infer<typeof ClientWithSchema>;

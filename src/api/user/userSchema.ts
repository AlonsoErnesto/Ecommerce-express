import { commonValidations } from '@/common/utils/commonValidation';
import { extendZodWithOpenApi } from '@asteasolutions/zod-to-openapi';
import { z } from 'zod';

extendZodWithOpenApi(z);

// Esquema base para validar entrada de datos
export const UserSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Email is invalid'),
  role: z.enum(['user', 'admin']).default('user'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
});

// Esquema para representar documentos de MongoDB que incluyen _id
export const UserWithIdSchema = UserSchema.extend({
  _id: z.string(), // MongoDB genera _id como ObjectId, que puede ser tratado como string en este contexto
});

export const GetUserSchema = z.object({
  params: z.object({ id: commonValidations.id }),
});

// Tipos inferidos a partir de los esquemas
export type User = z.infer<typeof UserSchema>;
export type UserWithId = z.infer<typeof UserWithIdSchema>; // Este tipo incluye el _id

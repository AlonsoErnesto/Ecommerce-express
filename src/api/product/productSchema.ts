import { commonValidations } from '@/common/utils/commonValidation';
import { extendZodWithOpenApi } from '@asteasolutions/zod-to-openapi';
import { z } from 'zod';

const ObjectIdRegex = /^[0-9a-fA-F]{24}$/;
extendZodWithOpenApi(z);

export const ProductSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  price: z.number().positive('Price must be a positive number'),
  description: z.string().optional(),
  inStock: z.boolean().default(true),
  category: z.string().regex(ObjectIdRegex, 'Invalid Category ID format'), // Validación de ObjectId
  brand: z.string().regex(ObjectIdRegex, 'Invalid Brand ID format'),
  size: z.string().min(1, 'Size is required'),
  color: z.string().min(1, 'Color is required'),
  image_url: z.array(z.string().url('Image URL must be a valid URL')),
});

// Si quieres validar que el ID sea un ObjectId válido
export const ValidatedProductSchema = ProductSchema.extend({
  category_id: z.string().regex(ObjectIdRegex, 'Invalid Category ID format'),
  brand_id: z.string().regex(ObjectIdRegex, 'Invalid Brand ID format'),
});

export const GetProductSchema = z.object({
  params: z.object({ id: commonValidations.id }),
});

// Define el tipo TypeScript basado en el esquema Zod
export type Product = z.infer<typeof ProductSchema>;

import { OpenAPIRegistry } from '@asteasolutions/zod-to-openapi';
import express, { type Router } from 'express';
import { productController } from './productController';
import { createApiResponse } from '@/api-docs/openAPIResponseBuilders';
import { z } from 'zod';
import { GetProductSchema, ProductSchema } from './productSchema';
import { validateRequest } from '@/common/utils/httpHandlers';

export const productRegistry = new OpenAPIRegistry();
export const productRouter: Router = express.Router();

productRegistry.register('Product', ProductSchema);
productRegistry.registerPath({
  method: 'post',
  path: '/products',
  tags: ['Product'],
  request: {
    body: {
      content: {
        'application/json': {
          schema: ProductSchema,
        },
      },
    },
  },
  responses: createApiResponse(z.array(ProductSchema), 'Success'),
});
productRouter.post('/', productController.createProduct);

// Obtener todos los productos
productRegistry.registerPath({
  method: 'get',
  path: '/products',
  tags: ['Product'],
  security: [{ BearerAuth: [] }],
  responses: createApiResponse(z.array(ProductSchema), 'Success'),
});
productRouter.get('/', productController.getAllProducts);

// Obtener un producto por ID
productRegistry.registerPath({
  method: 'get',
  path: '/products/{id}',
  tags: ['Product'],
  request: { params: GetProductSchema.shape.params },
  responses: createApiResponse(z.array(ProductSchema), 'Success'),
});
productRouter.get('/:id', validateRequest(GetProductSchema), productController.getProductById);

// Actualizar un producto
productRouter.put('/:id', productController.updateProduct);

// Eliminar un producto
productRouter.delete('/:id', productController.deleteProduct);

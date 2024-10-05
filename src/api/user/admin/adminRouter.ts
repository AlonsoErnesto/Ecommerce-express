import express, { type Router } from 'express';
import { OpenAPIRegistry } from '@asteasolutions/zod-to-openapi';
import { z } from 'zod';
import { createApiResponse } from '@/api-docs/openAPIResponseBuilders';
import { adminController } from './adminController';
import { GetAdminSchema, AdminSchema } from './adminSchema';
import { verifyCookie } from '@/common/middleware/authenticateToken';

export const adminRegistry = new OpenAPIRegistry();
export const adminRouter: Router = express.Router();

adminRegistry.register('Admin', AdminSchema);

adminRegistry.registerPath({
  method: 'get',
  path: '/admins',
  tags: ['Admin'],
  responses: createApiResponse(z.array(AdminSchema), 'Success'),
});

adminRegistry.registerPath({
  method: 'get',
  path: '/admin/{id}',
  tags: ['Admin'],
  request: { params: GetAdminSchema.shape.params },
  responses: createApiResponse(AdminSchema, 'Success'),
});

// adminRouter.get('/:id', validateRequest(GetAdminSchema), adminController.getAdmin);
//register

adminRegistry.registerPath({
  method: 'post',
  path: '/admins',
  tags: ['admin'],
  request: { params: GetAdminSchema.shape.params },
  responses: createApiResponse(AdminSchema, 'Success'),
});

adminRouter.post('/register', adminController.createAdmin);
//login
adminRouter.post('/login', adminController.login);

adminRouter.get('/authcheck', verifyCookie, (req, res) => {
  // res.json({ isAuthenticated: true, user: req.user });
  res.json({ isAuthenticated: true });
});

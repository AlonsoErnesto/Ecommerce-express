import { OpenAPIRegistry } from '@asteasolutions/zod-to-openapi';
import express, { type Router } from 'express';
import { clientController } from './clientController';

export const clientRegistry = new OpenAPIRegistry();
export const clientRouter: Router = express.Router();

clientRouter.post('/register', clientController.createClient);
clientRouter.post('/login', clientController.login);

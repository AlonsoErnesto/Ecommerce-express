import express, { type Router } from 'express';
import { categoryController } from './categoryController';

export const categoryRouter: Router = express.Router();

categoryRouter.post('/', categoryController.createCategory);
// categoryRouter.get('/', categoryController.getAllCategories);
// categoryRouter.get('/:id', categoryController.getCategoryById);
// categoryRouter.put('/:id', categoryController.updateCategory);
// categoryRouter.delete('/:id', categoryController.deleteCategory);

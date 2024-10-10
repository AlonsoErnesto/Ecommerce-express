import express, { type Router } from 'express';
import { brandController } from './brandController';

export const brandRouter: Router = express.Router();

brandRouter.post('/', brandController.createBrand);

// Obtener todos los productos
brandRouter.get('/', brandController.getAllBrands);

// Obtener un producto por ID
brandRouter.get('/:id', brandController.getBrandById);

// Actualizar un producto
brandRouter.put('/:id', brandController.updateBrand);

// Eliminar un producto
brandRouter.delete('/:id', brandController.deleteBrand);

import { Request, RequestHandler, Response } from 'express';
import { ProductService } from './productService';
import { ProductSchema } from './productSchema';

export class ProductController {
  private productService: ProductService;

  constructor(service: ProductService = new ProductService()) {
    this.productService = service;
  }

  createProduct: RequestHandler = async (req: Request, res: Response): Promise<void> => {
    try {
      const parsedData = ProductSchema.parse(req.body);
      const product = await this.productService.createProduct(parsedData);
      res.status(201).json(product);
    } catch (error) {
      res.status(400).json({ error });
    }
  };

  getAllProducts: RequestHandler = async (req: Request, res: Response): Promise<void> => {
    try {
      const products = await this.productService.getAllProducts();
      res.json(products);
    } catch (error) {
      res.status(500).json({ error });
    }
  };

  getProductById: RequestHandler = async (req: Request, res: Response): Promise<void> => {
    try {
      const product = await this.productService.getProductById(req.params.id);
      if (product) {
        res.json(product);
      } else {
        res.status(404).json({ error: 'Product not found' });
      }
    } catch (error) {
      res.status(500).json({ error });
    }
  };

  updateProduct: RequestHandler = async (req: Request, res: Response): Promise<void> => {
    try {
      const parsedData = ProductSchema.partial().parse(req.body);
      const product = await this.productService.updateProduct(req.params.id, parsedData);
      if (product) {
        res.json(product);
      } else {
        res.status(404).json({ error: 'Product not found' });
      }
    } catch (error) {
      res.status(400).json({ error });
    }
  };

  deleteProduct: RequestHandler = async (req: Request, res: Response): Promise<void> => {
    try {
      const product = await this.productService.deleteProduct(req.params.id);
      if (product) {
        res.json({ message: 'Product deleted successfully' });
      } else {
        res.status(404).json({ error: 'Product not found' });
      }
    } catch (error) {
      res.status(500).json({ error });
    }
  };
}

export const productController = new ProductController();

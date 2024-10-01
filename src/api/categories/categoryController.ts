import { Request, RequestHandler, Response } from 'express';
import { CategoryService } from './categoryService';

export class CategoryController {
  private categoryService: CategoryService;

  constructor(service: CategoryService = new CategoryService()) {
    this.categoryService = service;
  }

  createCategory: RequestHandler = async (req: Request, res: Response): Promise<void> => {
    try {
      const parsedData = req.body;
      const category = await this.categoryService.createCategory(parsedData);
      res.status(201).json(category);
    } catch (error) {
      res.status(400).json({ error });
    }
  };
}
export const categoryController = new CategoryController();

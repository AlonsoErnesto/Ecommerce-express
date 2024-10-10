import type { Request, RequestHandler, Response } from 'express';
import { BrandService } from './brandService';

export class BrandController {
  private brandService: BrandService;
  constructor(service: BrandService = new BrandService()) {
    this.brandService = service;
  }

  createBrand: RequestHandler = async (
    req: Request,
    res: Response,
  ): Promise<void> => {
    try {
      const parsedData = req.body;
      const brand = await this.brandService.createBrand(parsedData);
      res.status(201).json(brand);
    } catch (error) {
      res.status(400).json({ error });
    }
  };
  getAllBrands: RequestHandler = async (
    req: Request,
    res: Response,
  ): Promise<void> => {
    try {
      const brands = await this.brandService.getAllBrands();
      res.json(brands);
    } catch (error) {
      res.status(500).json({ error });
    }
  };

  getBrandById: RequestHandler = async (
    req: Request,
    res: Response,
  ): Promise<void> => {
    try {
      const brand = await this.brandService.getBrandById(req.params.id);
      if (brand) {
        res.json(brand);
      } else {
        res.status(404).json({ error: 'Brand not found' });
      }
    } catch (error) {
      res.status(500).json({ error });
    }
  };

  updateBrand: RequestHandler = async (
    req: Request,
    res: Response,
  ): Promise<void> => {
    try {
      const parsedData = req.body;
      const brand = await this.brandService.updateBrand(
        req.params.id,
        parsedData,
      );
      if (brand) {
        res.json(brand);
      } else {
        res.status(404).json({ error: 'Brand not found' });
      }
    } catch (error) {
      res.status(400).json({ error });
    }
  };

  deleteBrand: RequestHandler = async (
    req: Request,
    res: Response,
  ): Promise<void> => {
    try {
      const brand = await this.brandService.deleteBrand(req.params.id);
      if (brand) {
        res.json({ message: 'Brand deleted successfully' });
      } else {
        res.status(404).json({ error: 'Brand not found' });
      }
    } catch (error) {
      res.status(500).json({ error });
    }
  };
}

export const brandController = new BrandController();

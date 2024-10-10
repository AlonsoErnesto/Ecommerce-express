import type { Document, Model } from 'mongoose';
import { BrandModel } from './brandModel';
import type { Brand } from './brandSchema';

export class BrandRepository {
  private brandModel: Model<Brand & Document>;

  constructor() {
    this.brandModel = BrandModel;
  }

  async create(brandData: Brand): Promise<Brand> {
    const brand = new this.brandModel(brandData);
    return await brand.save();
  }

  async findAll(): Promise<Brand[]> {
    return await this.brandModel.find();
  }

  async findById(id: string): Promise<Brand | null> {
    return await this.brandModel.findById(id);
  }

  async update(id: string, brandData: Partial<Brand>): Promise<Brand | null> {
    return await this.brandModel.findByIdAndUpdate(id, brandData, {
      new: true,
    });
  }

  async delete(id: string): Promise<Brand | null> {
    return await this.brandModel.findByIdAndDelete(id);
  }
}

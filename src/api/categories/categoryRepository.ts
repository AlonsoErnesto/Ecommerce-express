import { Document, Model } from 'mongoose';
import { Category } from './categorySchema';
import { CategoryModel } from './categoryModel';

export class CategoryRepository {
  private categoryModel: Model<Category & Document>;

  constructor() {
    this.categoryModel = CategoryModel;
  }

  async create(categoryData: Category): Promise<Category> {
    const category = new this.categoryModel(categoryData);
    return await category.save();
  }

  async findAll(): Promise<Category[]> {
    return await this.categoryModel.find();
  }

  async findById(id: string): Promise<Category | null> {
    return await this.categoryModel.findById(id);
  }

  async update(id: string, categoryData: Partial<Category>): Promise<Category | null> {
    return await this.categoryModel.findByIdAndUpdate(id, categoryData, { new: true });
  }

  async delete(id: string): Promise<Category | null> {
    return await this.categoryModel.findByIdAndDelete(id);
  }
}

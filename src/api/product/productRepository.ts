import { Model, Document } from 'mongoose';
import { ProductModel } from './productModel';
import { Product } from './productSchema';

export class ProductRepository {
  private productModel: Model<Product & Document>;

  constructor() {
    this.productModel = ProductModel;
  }

  async create(productData: Product): Promise<Product> {
    const product = new this.productModel(productData);
    return await product.save();
  }

  async findById(productId: string): Promise<Product | null> {
    return await this.productModel
      .findById(productId)
      .populate('brand', 'name decription  logo_url')
      .populate('category', 'name description')
      .exec();
  }

  async findAll(): Promise<Product[]> {
    return await this.productModel
      .find()
      .populate('brand', 'name decription  logo_url')
      .populate('category', 'name description');
  }

  async update(productId: string, productData: Partial<Product>): Promise<Product | null> {
    return await this.productModel
      .findByIdAndUpdate(productId, productData, {
        new: true,
        runValidators: true,
      })
      .exec();
  }

  async delete(productId: string): Promise<Product | null> {
    return await this.productModel.findByIdAndDelete(productId).exec();
  }
}

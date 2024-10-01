import { ServiceResponse } from '@/common/models/serviceResponse';
import { ProductRepository } from './productRepository';
import { Product } from './productSchema';

export class ProductService {
  private productRepository: ProductRepository;

  constructor(repository: ProductRepository = new ProductRepository()) {
    this.productRepository = repository;
  }

  async createProduct(productData: Product): Promise<ServiceResponse<Product | null>> {
    try {
      const product = await this.productRepository.create(productData);
      return ServiceResponse.success('Product created successfully', product);
    } catch (error) {
      return ServiceResponse.failure(`Error creating product: ${error}`, null);
    }
  }

  async getProductById(productId: string): Promise<ServiceResponse<Product | null>> {
    try {
      const product = await this.productRepository.findById(productId);
      if (product) {
        return ServiceResponse.success('Product fetched successfully', product);
      } else {
        return ServiceResponse.failure('Product not found', null);
      }
    } catch (error) {
      return ServiceResponse.failure(`Error fetching product by ID: ${error}`, null);
    }
  }

  async getAllProducts(): Promise<ServiceResponse<Product[]>> {
    try {
      const products = await this.productRepository.findAll();
      return ServiceResponse.success('Products fetched successfully', products);
    } catch (error) {
      return ServiceResponse.failure(`Error fetching all products: ${error}`, []);
    }
  }

  async updateProduct(productId: string, productData: Partial<Product>): Promise<ServiceResponse<Product | null>> {
    try {
      const updatedProduct = await this.productRepository.update(productId, productData);
      if (updatedProduct) {
        return ServiceResponse.success('Product updated successfully', updatedProduct);
      } else {
        return ServiceResponse.failure('Product not found or update failed', null);
      }
    } catch (error) {
      return ServiceResponse.failure(`Error updating product: ${error}`, null);
    }
  }

  async deleteProduct(productId: string): Promise<ServiceResponse<Product | null>> {
    try {
      const deletedProduct = await this.productRepository.delete(productId);
      if (deletedProduct) {
        return ServiceResponse.success('Product deleted successfully', deletedProduct);
      } else {
        return ServiceResponse.failure('Product not found or deletion failed', null);
      }
    } catch (error) {
      return ServiceResponse.failure(`Error deleting product: ${error}`, null);
    }
  }
}

export const productService = new ProductService();

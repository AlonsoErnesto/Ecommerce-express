import { ServiceResponse } from '@/common/models/serviceResponse';
import { CategoryRepository } from './categoryRepository';
import type { Category } from './categorySchema';

export class CategoryService {
  private categoryRepository: CategoryRepository;

  constructor(repository: CategoryRepository = new CategoryRepository()) {
    this.categoryRepository = repository;
  }

  async createCategory(
    categoryData: Category,
  ): Promise<ServiceResponse<Category | null>> {
    try {
      const category = await this.categoryRepository.create(categoryData);
      return ServiceResponse.success('Category created successfully', category);
    } catch (error) {
      return ServiceResponse.failure(`Error creating category: ${error}`, null);
    }
  }

  async getAllCategories(): Promise<ServiceResponse<Category[]>> {
    try {
      const categories = await this.categoryRepository.findAll();
      return ServiceResponse.success(
        'Categories fetched successfully',
        categories,
      );
    } catch (error) {
      return ServiceResponse.failure(
        `Error fetching all categories: ${error}`,
        [],
      );
    }
  }

  async getCategoryById(
    categoryId: string,
  ): Promise<ServiceResponse<Category | null>> {
    try {
      const category = await this.categoryRepository.findById(categoryId);
      if (category) {
        return ServiceResponse.success(
          'Category fetched successfully',
          category,
        );
      } else {
        return ServiceResponse.failure('Category not found', null);
      }
    } catch (error) {
      return ServiceResponse.failure(
        `Error fetching category by ID: ${error}`,
        null,
      );
    }
  }

  async updateCategory(
    categoryId: string,
    categoryData: Partial<Category>,
  ): Promise<ServiceResponse<Category | null>> {
    try {
      const updatedCategory = await this.categoryRepository.update(
        categoryId,
        categoryData,
      );
      if (updatedCategory) {
        return ServiceResponse.success(
          'Category updated successfully',
          updatedCategory,
        );
      } else {
        return ServiceResponse.failure(
          'Category not found or update failed',
          null,
        );
      }
    } catch (error) {
      return ServiceResponse.failure(`Error updating category: ${error}`, null);
    }
  }

  async deleteCategory(
    categoryId: string,
  ): Promise<ServiceResponse<Category | null>> {
    try {
      const deletedCategory = await this.categoryRepository.delete(categoryId);
      if (deletedCategory) {
        return ServiceResponse.success(
          'Category deleted successfully',
          deletedCategory,
        );
      } else {
        return ServiceResponse.failure(
          'Category not found or deletion failed',
          null,
        );
      }
    } catch (error) {
      return ServiceResponse.failure(`Error deleting category: ${error}`, null);
    }
  }
}

export const categoryService = new CategoryService();

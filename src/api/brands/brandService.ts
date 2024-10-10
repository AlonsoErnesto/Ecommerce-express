import { ServiceResponse } from '@/common/models/serviceResponse';
import { BrandRepository } from './brandRepository';
import type { Brand } from './brandSchema';

export class BrandService {
  private brandRepository: BrandRepository;

  constructor(repository: BrandRepository = new BrandRepository()) {
    this.brandRepository = repository;
  }

  async createBrand(brandData: Brand): Promise<ServiceResponse<Brand | null>> {
    try {
      const brand = await this.brandRepository.create(brandData);
      return ServiceResponse.success('Brand created successfully', brand);
    } catch (error) {
      return ServiceResponse.failure(`Error creating brand: ${error}`, null);
    }
  }

  async getAllBrands(): Promise<ServiceResponse<Brand[]>> {
    try {
      const brands = await this.brandRepository.findAll();
      return ServiceResponse.success('Brands fetched successfully', brands);
    } catch (error) {
      return ServiceResponse.failure(`Error fetching all brands: ${error}`, []);
    }
  }

  async getBrandById(brandId: string): Promise<ServiceResponse<Brand | null>> {
    try {
      const brand = await this.brandRepository.findById(brandId);
      if (brand) {
        return ServiceResponse.success('Brand fetched successfully', brand);
      } else {
        return ServiceResponse.failure('Brand not found', null);
      }
    } catch (error) {
      return ServiceResponse.failure(
        `Error fetching brand by ID: ${error}`,
        null,
      );
    }
  }

  async updateBrand(
    brandId: string,
    brandData: Partial<Brand>,
  ): Promise<ServiceResponse<Brand | null>> {
    try {
      const updatedBrand = await this.brandRepository.update(
        brandId,
        brandData,
      );
      if (updatedBrand) {
        return ServiceResponse.success(
          'Brand updated successfully',
          updatedBrand,
        );
      } else {
        return ServiceResponse.failure(
          'Brand not found or update failed',
          null,
        );
      }
    } catch (error) {
      return ServiceResponse.failure(`Error updating brand: ${error}`, null);
    }
  }

  async deleteBrand(brandId: string): Promise<ServiceResponse<Brand | null>> {
    try {
      const deletedBrand = await this.brandRepository.delete(brandId);
      if (deletedBrand) {
        return ServiceResponse.success(
          'Brand deleted successfully',
          deletedBrand,
        );
      } else {
        return ServiceResponse.failure(
          'Brand not found or deletion failed',
          null,
        );
      }
    } catch (error) {
      return ServiceResponse.failure(`Error deleting brand: ${error}`, null);
    }
  }
}

export const brandService = new BrandService();

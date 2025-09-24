import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Product } from '../entities/products-entities';
import { PaginatedFiltersDto, PaginatedResponse, createPaginatedResponse } from '../../../common';

@Injectable()
export class ProductQueryService {
    
    buildWhereCondition(filters: PaginatedFiltersDto): any {
        const whereCondition: any = {};
        
        if (filters.isActiveBoolean !== undefined) {
            whereCondition.isActive = filters.isActiveBoolean;
        }

        return whereCondition;
    }

    async findAllWithFilters(
        productsRepository: Repository<Product>,
        filters: PaginatedFiltersDto
    ): Promise<PaginatedResponse<Product>> {
        const { page = 1, limit = 10 } = filters;
        const skip = filters.skip;
        
        const whereCondition = this.buildWhereCondition(filters);
        
        const [data, total] = await productsRepository.findAndCount({
            where: whereCondition,
            skip,
            take: limit,
            order: { id: 'DESC' }
        });
        
        return createPaginatedResponse(data, page, limit, total);
    }

    async findById(productsRepository: Repository<Product>, id: number): Promise<Product | null> {
        return productsRepository.findOne({ where: { id } });
    }

    async findByName(productsRepository: Repository<Product>, name: string): Promise<Product | null> {
        return productsRepository.findOne({ where: { name } });
    }
}
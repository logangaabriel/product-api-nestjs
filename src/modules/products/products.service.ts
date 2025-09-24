import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './entities/products-entities';
import { Repository } from 'typeorm';
import { CreateProductDto } from './dto/products-dto';
import { UpdateProductDto } from './dto/products-update-dto';
import { PaginatedFiltersDto, PaginatedResponse } from '../../common';
import { ProductValidationService } from './validation/product-validation.service';
import { ProductQueryService } from './services/product-query.service';

@Injectable()
export class ProductsService {

    constructor(
        @InjectRepository(Product)
        private readonly productsRepository: Repository<Product>,
        private readonly productValidationService: ProductValidationService,
        private readonly productQueryService: ProductQueryService,
    ) { }

    async findAll(filters: PaginatedFiltersDto): Promise<PaginatedResponse<Product>> {
        return this.productQueryService.findAllWithFilters(this.productsRepository, filters);
    }

    async findOne(id: number): Promise<Product> {
        const product = await this.productQueryService.findById(this.productsRepository, id);
        
        this.productValidationService.validateProductExists(product, id);
        
        return product!;
    }

    async create(createProductDto: CreateProductDto): Promise<Product> {
        await this.productValidationService.validateNameUniqueness(
            this.productsRepository,
            createProductDto.name
        );

        const newProduct = this.productsRepository.create({
            ...createProductDto,
            isActive: createProductDto.isActive ?? true
        });

        return this.productsRepository.save(newProduct);
    }

    async update(id: number, updateProductDto: UpdateProductDto): Promise<Product> {
        await this.findOne(id);

        if (updateProductDto.name) {
            await this.productValidationService.validateNameUniqueness(
                this.productsRepository,
                updateProductDto.name,
                id
            );
        }

        await this.productsRepository.update(id, updateProductDto);

        return this.findOne(id);
    }

    async remove(id: number): Promise<void> {
        await this.findOne(id);
        await this.productsRepository.delete(id);
    }
}

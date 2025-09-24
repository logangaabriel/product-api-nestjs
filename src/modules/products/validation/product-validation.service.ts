import { Injectable, ConflictException, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Product } from '../entities/products-entities';

@Injectable()
export class ProductValidationService {

    async validateNameUniqueness(
        productsRepository: Repository<Product>, 
        name: string, 
        excludeId?: number
    ): Promise<void> {
        const existingProduct = await productsRepository.findOne({ where: { name } });

        if (existingProduct && (!excludeId || existingProduct.id !== excludeId)) {
            throw new ConflictException(`Já existe um produto com o nome '${name}'`);
        }
    }

    validateProductExists(product: Product | null, id: number): void {
        if (!product) {
            throw new NotFoundException(`Produto com ID '${id}' não foi encontrado`);
        }
    }
}
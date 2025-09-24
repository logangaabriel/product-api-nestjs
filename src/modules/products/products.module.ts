import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './entities/products-entities';
import { ProductValidationService } from './validation/product-validation.service';
import { ProductQueryService } from './services/product-query.service';

@Module({
  imports: [TypeOrmModule.forFeature([Product])],
  providers: [
    ProductsService,
    ProductValidationService,
    ProductQueryService,
  ],
  controllers: [ProductsController],
})
export class ProductsModule {}

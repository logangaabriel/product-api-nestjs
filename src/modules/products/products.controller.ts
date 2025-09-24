import { Controller, Get, Post, Body, Param, Put, Delete, HttpCode, HttpStatus, Query } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiQuery, ApiBody, ApiBearerAuth } from '@nestjs/swagger';
import { Product } from './entities/products-entities';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/products-dto';
import { UpdateProductDto } from './dto/products-update-dto';
import { PaginatedFiltersDto, PaginatedResponse } from '../../common';
import { RequireAuth, RequireAdmin } from '../auth/decorators/auth.decorator';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { AuthenticatedUser } from '../auth/interfaces/authenticated-user.interface';

@ApiTags('Products')
@Controller('products')
export class ProductsController {
    constructor(private readonly productsService: ProductsService) {}

    @Get()
    @ApiOperation({ summary: 'Listar todos os produtos com paginação e filtros' })
    @ApiResponse({ status: 200, description: 'Lista de produtos retornada com sucesso' })
    @ApiQuery({ name: 'page', required: false, description: 'Número da página' })
    @ApiQuery({ name: 'limit', required: false, description: 'Quantidade de itens por página' })
    @ApiQuery({ name: 'isActive', required: false, description: 'Filtrar produtos ativos' })
    async findAll(@Query() filters: PaginatedFiltersDto): Promise<PaginatedResponse<Product>> {
        return this.productsService.findAll(filters);
    }

    @Get(':id')
    @ApiOperation({ summary: 'Buscar produto por ID' })
    @ApiResponse({ status: 200, description: 'Produto encontrado' })
    @ApiResponse({ status: 404, description: 'Produto não encontrado' })
    @ApiParam({ name: 'id', description: 'ID do produto' })
    async findOne(@Param('id') id: number): Promise<Product> {
        return this.productsService.findOne(+id);
    }

  @Post()
  @RequireAdmin()
  @HttpCode(HttpStatus.CREATED)
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({ 
    summary: 'Criar novo produto (apenas admin)',
    description: 'Cria um novo produto. Apenas administradores podem criar produtos. O createdById será automaticamente preenchido com o ID do usuário autenticado.'
  })
  @ApiBody({ 
    type: CreateProductDto,
    description: 'Product data. Note: createdById is automatically set from the authenticated user.'
  })
  @ApiResponse({ 
    status: 201, 
    description: 'Product created successfully',
    type: Product,
    example: {
      id: 1,
      name: 'Sample Product',
      description: 'This is a sample product',
      price: 29.99,
      stock: 100,
      createdById: 1,
      createdAt: '2024-01-15T10:30:00Z',
      updatedAt: '2024-01-15T10:30:00Z'
    }
  })
  @ApiResponse({ 
    status: 400, 
    description: 'Invalid product data',
    example: {
      statusCode: 400,
      message: ['name should not be empty', 'price must be a positive number'],
      error: 'Bad Request'
    }
  })
  @ApiResponse({ 
    status: 401, 
    description: 'Unauthorized - Invalid or missing JWT token',
    example: {
      statusCode: 401,
      message: 'Unauthorized',
      error: 'Unauthorized'
    }
  })
  @ApiResponse({ 
    status: 403, 
    description: 'Forbidden - Only administrators can create products',
    example: {
      statusCode: 403,
      message: 'Acesso negado: privilégios de administrador necessários',
      error: 'Forbidden'
    }
  })
  async create(
    @Body() createProductDto: CreateProductDto,
    @CurrentUser() user: AuthenticatedUser
  ): Promise<Product> {
    const productData = {
      ...createProductDto,
      createdById: user.id
    };
    
    return this.productsService.create(productData);
  }    @Put(':id')
    @RequireAdmin()
    @ApiBearerAuth('JWT-auth')
    @ApiOperation({ summary: 'Atualizar produto (apenas admin)' })
    @ApiResponse({ status: 200, description: 'Produto atualizado com sucesso' })
    @ApiResponse({ status: 401, description: 'Token de acesso necessário' })
    @ApiResponse({ status: 403, description: 'Apenas administradores podem atualizar produtos' })
    @ApiResponse({ status: 404, description: 'Produto não encontrado' })
    @ApiResponse({ status: 409, description: 'Nome do produto já existe' })
    @ApiParam({ name: 'id', description: 'ID do produto' })
    @ApiBody({ type: UpdateProductDto })
    async update(
        @Param('id') id: number, 
        @Body() updateProductDto: UpdateProductDto
    ): Promise<Product> {
        return this.productsService.update(+id, updateProductDto);
    }

    @Delete(':id')
    @RequireAdmin()
    @ApiBearerAuth('JWT-auth')
    @HttpCode(HttpStatus.NO_CONTENT)
    @ApiOperation({ summary: 'Deletar produto (apenas admin)' })
    @ApiResponse({ status: 204, description: 'Produto deletado com sucesso' })
    @ApiResponse({ status: 401, description: 'Token de acesso necessário' })
    @ApiResponse({ status: 403, description: 'Apenas administradores podem deletar produtos' })
    @ApiResponse({ status: 404, description: 'Produto não encontrado' })
    @ApiParam({ name: 'id', description: 'ID do produto' })
    async remove(@Param('id') id: number): Promise<void> {
        return this.productsService.remove(+id);
    }
}

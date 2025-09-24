import { IsNotEmpty, IsNumber, IsString, IsOptional, IsBoolean, Min, IsUrl } from "class-validator";
import { ApiProperty } from '@nestjs/swagger';

export class CreateProductDto {
    @ApiProperty({
        description: 'Nome do produto',
        example: 'iPhone 15 Pro'
    })
    @IsString({ message: 'O nome deve ser uma string válida' })
    @IsNotEmpty({ message: 'O nome é obrigatório' })
    name: string;

    @ApiProperty({
        description: 'Descrição detalhada do produto',
        example: 'Smartphone premium da Apple com câmera de alta qualidade'
    })
    @IsString({ message: 'A descrição deve ser uma string válida' })
    @IsNotEmpty({ message: 'A descrição é obrigatória' })
    description: string;

    @ApiProperty({
        description: 'Preço do produto em reais',
        example: 4999.99
    })
    @IsNumber({}, { message: 'O preço deve ser um número válido' })
    @Min(0, { message: 'O preço deve ser maior ou igual a zero' })
    @IsNotEmpty({ message: 'O preço é obrigatório' })
    price: number;

    @ApiProperty({
        description: 'Quantidade em estoque',
        example: 50
    })
    @IsNumber({}, { message: 'O estoque deve ser um número válido' })
    @Min(0, { message: 'O estoque deve ser maior ou igual a zero' })
    @IsNotEmpty({ message: 'O estoque é obrigatório' })
    stock: number;

    @ApiProperty({
        description: 'Status ativo do produto',
        example: true,
        required: false
    })
    @IsBoolean({ message: 'O status ativo deve ser um valor booleano' })
    @IsOptional()
    isActive?: boolean;

    @ApiProperty({
        description: 'URL da imagem do produto',
        example: 'https://example.com/images/iphone15.jpg',
        required: false
    })
    @IsString({ message: 'A URL da imagem deve ser uma string válida' })
    @IsUrl({}, { message: 'A URL da imagem deve ser uma URL válida' })
    @IsOptional()
    imageUrl?: string;
}
import { IsOptional, IsPositive, Min, Max, IsIn } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class PaginationDto {
    @ApiProperty({
        description: 'Número da página',
        minimum: 1,
        default: 1,
        required: false
    })
    @IsOptional()
    @Type(() => Number)
    @IsPositive({ message: 'A página deve ser um número positivo' })
    @Min(1, { message: 'A página deve ser maior ou igual a 1' })
    page?: number = 1;

    @ApiProperty({
        description: 'Quantidade de itens por página',
        minimum: 1,
        maximum: 100,
        default: 10,
        required: false
    })
    @IsOptional()
    @Type(() => Number)
    @IsPositive({ message: 'O limite deve ser um número positivo' })
    @Min(1, { message: 'O limite deve ser maior ou igual a 1' })
    @Max(100, { message: 'O limite não pode ser maior que 100' })
    @IsIn([10, 15, 20, 25, 50, 100], { 
        message: 'O limite deve ser um dos valores permitidos: 10, 15, 20, 25, 50, 100' 
    })
    limit?: number = 10;

    get skip(): number {
        return ((this.page || 1) - 1) * (this.limit || 10);
    }
}
import { IsOptional, IsIn } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { PaginationDto } from './pagination.dto';

export class PaginatedFiltersDto extends PaginationDto {
    @ApiProperty({
        description: 'Filtrar por status ativo',
        enum: ['true', 'false', 'all'],
        default: 'true',
        required: false
    })
    @IsOptional()
    @IsIn(['true', 'false', 'all'], { 
        message: 'isActive deve ser "true", "false" ou "all"' 
    })
    isActive?: 'true' | 'false' | 'all' = 'true';

    @ApiProperty({
        description: 'Filtrar por usuários admin',
        enum: ['true', 'false', 'all'],
        required: false
    })
    @IsOptional()
    @IsIn(['true', 'false', 'all'], { 
        message: 'isAdmin deve ser "true", "false" ou "all"' 
    })
    isAdmin?: 'true' | 'false' | 'all';

    get isActiveBoolean(): boolean | undefined {
        if (this.isActive === 'all') {
            return undefined; 
        }
        return this.isActive === 'true';
    }

    get isAdminBoolean(): boolean | undefined {
        if (this.isAdmin === 'all' || this.isAdmin === undefined) {
            return undefined;
        }
        return this.isAdmin === 'true';
    }
}
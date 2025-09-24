import { IsOptional, IsIn } from 'class-validator';

export class CommonFiltersDto {
    @IsOptional()
    @IsIn(['true', 'false', 'all'], { 
        message: 'isActive deve ser "true", "false" ou "all"' 
    })
    isActive?: 'true' | 'false' | 'all' = 'true';

    get isActiveBoolean(): boolean | undefined {
        if (this.isActive === 'all') {
            return undefined;
        }
        return this.isActive === 'true';
    }
}
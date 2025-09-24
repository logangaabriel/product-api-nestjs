import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { UsersEntity } from '../entities/users-entities';
import { PaginatedFiltersDto, PaginatedResponse, createPaginatedResponse } from '../../../common';

@Injectable()
export class UserQueryService {
    
    buildWhereCondition(filters: PaginatedFiltersDto): any {
        const whereCondition: any = {};
        
        if (filters.isActiveBoolean !== undefined) {
            whereCondition.isActive = filters.isActiveBoolean;
        }

        if (filters.isAdminBoolean !== undefined) {
            whereCondition.isAdmin = filters.isAdminBoolean;
        }

        return whereCondition;
    }

    async findAllWithFilters(
        usersRepository: Repository<UsersEntity>,
        filters: PaginatedFiltersDto
    ): Promise<PaginatedResponse<UsersEntity>> {
        const { page = 1, limit = 10 } = filters;
        const skip = filters.skip;
        
        const whereCondition = this.buildWhereCondition(filters);
        
        const [data, total] = await usersRepository.findAndCount({
            where: whereCondition,
            skip,
            take: limit,
            order: { id: 'DESC' },
            select: ['id', 'username', 'email', 'isActive', 'isAdmin', 'createdAt', 'updatedAt']
        });
        
        return createPaginatedResponse(data, page, limit, total);
    }

    async findByEmail(usersRepository: Repository<UsersEntity>, email: string): Promise<UsersEntity | null> {
        return usersRepository.findOne({ where: { email } });
    }

    async findById(usersRepository: Repository<UsersEntity>, id: number): Promise<UsersEntity | null> {
        return usersRepository.findOne({ where: { id } });
    }
}
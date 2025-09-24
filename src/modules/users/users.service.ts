import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UpdateUserDto } from './dto/update-user-dto';
import { CreateUserDto } from './dto/create-user-dto';
import { ChangePasswordDto } from './dto/change-password-dto';
import { UsersEntity } from './entities/users-entities';
import { PaginatedFiltersDto, PaginatedResponse } from '../../common';
import { UserValidationService } from './validation/user-validation.service';
import { UserPasswordService } from './services/user-password.service';
import { UserQueryService } from './services/user-query.service';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(UsersEntity)
        private readonly usersRepository: Repository<UsersEntity>,
        private readonly userValidationService: UserValidationService,
        private readonly userPasswordService: UserPasswordService,
        private readonly userQueryService: UserQueryService,
    ) {}

    async findAll(filters: PaginatedFiltersDto): Promise<PaginatedResponse<UsersEntity>> {
        return this.userQueryService.findAllWithFilters(this.usersRepository, filters);
    }

    async findOne(id: number): Promise<UsersEntity> {
        const user = await this.userQueryService.findById(this.usersRepository, id);
        
        this.userValidationService.validateUserExists(user, id);
        
        return user!;
    }

    async findByEmail(email: string): Promise<UsersEntity | null> {
        return this.userQueryService.findByEmail(this.usersRepository, email);
    }

    async create(createUserDto: CreateUserDto): Promise<any> {
        await this.userValidationService.validateEmailUniqueness(
            this.usersRepository,
            createUserDto.email
        );

        const hashedPassword = await this.userPasswordService.hashPassword(createUserDto.password);

        const newUser = this.usersRepository.create({
            ...createUserDto,
            password: hashedPassword,
            isActive: createUserDto.isActive ?? true
        });

        const savedUser = await this.usersRepository.save(newUser);
        
        return {
            id: savedUser.id,
            nome: savedUser.username,
            email: savedUser.email,
            createdAt: savedUser.createdAt,
            isActive: savedUser.isActive,
            isAdmin: savedUser.isAdmin
        };
    }

    async update(id: number, updateUserDto: UpdateUserDto): Promise<UsersEntity> {
        await this.findOne(id);

        if (updateUserDto.email) {
            await this.userValidationService.validateEmailUniqueness(
                this.usersRepository,
                updateUserDto.email,
                id
            );
        }

        await this.usersRepository.update(id, updateUserDto);

        return this.findOne(id);
    }

    async remove(id: number): Promise<void> {
        await this.findOne(id);
        await this.usersRepository.delete(id);
    }

    async changePassword(id: number, changePasswordDto: ChangePasswordDto): Promise<void> {
        await this.userPasswordService.changePassword(
            this.usersRepository,
            id,
            changePasswordDto
        );
    }
}

import { Injectable, ConflictException, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { UsersEntity } from '../entities/users-entities';
import { HashingService } from '../../auth/hashing/hashing.service';

@Injectable()
export class UserValidationService {
    constructor(private readonly hashingService: HashingService) {}

    async validateEmailUniqueness(
        usersRepository: Repository<UsersEntity>, 
        email: string, 
        excludeId?: number
    ): Promise<void> {
        const existingUser = await usersRepository.findOne({ where: { email } });

        if (existingUser && (!excludeId || existingUser.id !== excludeId)) {
            throw new ConflictException(`Já existe um usuário com o email '${email}'`);
        }
    }

    async validateUserExists(user: UsersEntity | null, id: number): Promise<void> {
        if (!user) {
            throw new NotFoundException(`Usuário com ID '${id}' não foi encontrado`);
        }
    }

    async validateCurrentPassword(currentPassword: string, hashedPassword: string): Promise<void> {
        const isCurrentPasswordValid = await this.hashingService.compare(
            currentPassword,
            hashedPassword
        );

        if (!isCurrentPasswordValid) {
            throw new UnauthorizedException('Senha atual incorreta');
        }
    }
}
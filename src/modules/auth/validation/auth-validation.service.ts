import { Injectable, UnauthorizedException } from '@nestjs/common';
import { HashingService } from '../hashing/hashing.service';
import { UsersEntity } from '../../users/entities/users-entities';

@Injectable()
export class AuthValidationService {
    constructor(private readonly hashingService: HashingService) {}

    async validateUserForLogin(user: UsersEntity | null, password: string): Promise<void> {
        if (!user) {
            throw new UnauthorizedException('Invalid credentials');
        }

        if (!user.isActive) {
            throw new UnauthorizedException('Account is inactive');
        }

        const isPasswordValid = await this.hashingService.compare(password, user.password);

        if (!isPasswordValid) {
            throw new UnauthorizedException('Invalid credentials');
        }
    }

    validateUserIsActive(user: UsersEntity): void {
        if (!user.isActive) {
            throw new UnauthorizedException('Usuário inativo');
        }
    }
}
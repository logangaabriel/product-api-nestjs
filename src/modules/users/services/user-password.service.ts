import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { UsersEntity } from '../entities/users-entities';
import { HashingService } from '../../auth/hashing/hashing.service';
import { ChangePasswordDto } from '../dto/change-password-dto';
import { UserValidationService } from '../validation/user-validation.service';

@Injectable()
export class UserPasswordService {
    constructor(
        private readonly hashingService: HashingService,
        private readonly userValidationService: UserValidationService,
    ) {}

    async hashPassword(password: string): Promise<string> {
        return this.hashingService.hash(password);
    }

    async changePassword(
        usersRepository: Repository<UsersEntity>,
        id: number, 
        changePasswordDto: ChangePasswordDto
    ): Promise<void> {
        const user = await usersRepository.findOne({ where: { id } });
        
        this.userValidationService.validateUserExists(user, id);

        await this.userValidationService.validateCurrentPassword(
            changePasswordDto.currentPassword,
            user!.password
        );
        
        const hashedPassword = await this.hashPassword(changePasswordDto.newPassword);
        
        await usersRepository.update(id, { password: hashedPassword });
    }
}
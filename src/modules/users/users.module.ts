import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersEntity } from './entities/users-entities';
import { HashingService } from '../auth/hashing/hashing.service';
import { BcryptService } from '../auth/hashing/bcrypt.service';
import { UserValidationService } from './validation/user-validation.service';
import { UserPasswordService } from './services/user-password.service';
import { UserQueryService } from './services/user-query.service';

@Module({
    imports: [TypeOrmModule.forFeature([UsersEntity])],
    controllers: [UsersController],
    providers: [
        UsersService,
        UserValidationService,
        UserPasswordService,
        UserQueryService,
        {
            provide: HashingService,
            useClass: BcryptService,
        },
    ],
    exports: [UsersService],
})
export class UsersModule {}

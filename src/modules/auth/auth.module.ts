import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsersModule } from '../users/users.module';
import { HashingService } from './hashing/hashing.service';
import { BcryptService } from './hashing/bcrypt.service';
import { JwtConfigService } from './config/jwt-config.service';
import { JwtStrategy } from './strategies/jwt.strategy';
import { LocalStrategy } from './strategies/local.strategy';
import { AuthValidationService } from './validation/auth-validation.service';
import { TokenService } from './services/token.service';

@Module({
  imports: [
    ConfigModule,
    UsersModule,
    PassportModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => {
        const secret = configService.get<string>('JWT_SECRET');
        const audience = configService.get<string>('JWT_TOKEN_AUDIENCE');
        const issuer = configService.get<string>('JWT_TOKEN_ISSUER');
        
        if (!secret || secret === 'default-secret') {
          throw new Error('JWT_SECRET is required and must be a secure value');
        }
        
        return {
          secret,
          signOptions: {
            expiresIn: '1h',
            audience,
            issuer,
          },
        };
      },
      inject: [ConfigService],
    }),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    AuthValidationService,
    TokenService,
    JwtConfigService,
    JwtStrategy,
    LocalStrategy,
    {
      provide: HashingService,
      useClass: BcryptService,
    },
  ],
  exports: [AuthService, JwtConfigService],
})
export class AuthModule {}

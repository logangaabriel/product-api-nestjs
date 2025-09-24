import { Injectable, UnauthorizedException, ConflictException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { LoginDto } from './dto/login-dto';
import { RegisterDto } from './dto/register.dto';
import { AuthResponse } from './interfaces/auth-response.interface';
import { AuthValidationService } from './validation/auth-validation.service';
import { TokenService } from './services/token.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly authValidationService: AuthValidationService,
    private readonly tokenService: TokenService,
  ) {}

  async login(loginDto: LoginDto): Promise<AuthResponse> {
    const user = await this.usersService.findByEmail(loginDto.email);
    
    await this.authValidationService.validateUserForLogin(user, loginDto.password);
    
    return this.tokenService.generateTokens(user!);
  }

    async register(registerDto: RegisterDto): Promise<AuthResponse> {
        try {
            const user = await this.usersService.create({
                ...registerDto,
                isAdmin: false, 
                isActive: true,
            });

            return this.tokenService.generateTokens(user);
        } catch (error) {
            if (error instanceof ConflictException) {
                throw error;
            }
            throw new ConflictException('Erro ao criar usuário');
        }
    }

    async refreshTokens(refreshToken: string): Promise<AuthResponse> {
        try {
            const payload = await this.tokenService.verifyRefreshToken(refreshToken);

            const user = await this.usersService.findOne(payload.sub);
            
            this.authValidationService.validateUserIsActive(user);

            return this.tokenService.generateTokens(user);
        } catch {
            throw new UnauthorizedException('Token de atualização inválido');
        }
    }
}

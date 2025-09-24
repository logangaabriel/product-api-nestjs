import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { JwtConfigService } from '../config/jwt-config.service';
import { TokenPayload } from '../interfaces/token-payload.interface';
import { AuthResponse } from '../interfaces/auth-response.interface';
import { UsersEntity } from '../../users/entities/users-entities';

@Injectable()
export class TokenService {
    constructor(
        private readonly jwtService: JwtService,
        private readonly jwtConfigService: JwtConfigService,
    ) {}

    async generateTokens(user: UsersEntity): Promise<AuthResponse> {
        const payload: TokenPayload = {
            sub: user.id,
            email: user.email,
            isAdmin: user.isAdmin,
        };

        const jwtOptions = this.getJwtOptions();

        const [accessToken, refreshToken] = await Promise.all([
            this.jwtService.signAsync(payload, {
                ...jwtOptions,
                expiresIn: this.jwtConfigService.accessTokenTtl,
            }),
            this.jwtService.signAsync(payload, {
                ...jwtOptions,
                expiresIn: this.jwtConfigService.refreshTokenTtl,
            }),
        ]);

        return {
            user: {
                id: user.id,
                email: user.email,
                username: user.username,
                isAdmin: user.isAdmin,
            },
            accessToken,
            refreshToken,
        };
    }

    async verifyRefreshToken(refreshToken: string): Promise<TokenPayload> {
        return this.jwtService.verifyAsync<TokenPayload>(
            refreshToken,
            this.getJwtOptions()
        );
    }

    private getJwtOptions() {
        return {
            audience: this.jwtConfigService.audience,
            issuer: this.jwtConfigService.issuer,
            secret: this.jwtConfigService.secret,
        };
    }
}
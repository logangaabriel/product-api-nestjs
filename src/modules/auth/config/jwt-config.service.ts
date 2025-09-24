import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class JwtConfigService {
    constructor(private readonly configService: ConfigService) {}

    get secret(): string {
        const secret = this.configService.get<string>('JWT_SECRET');
        if (!secret || secret === 'default-secret') {
            throw new Error('JWT_SECRET is required and must be a secure value. Please set it in your environment variables.');
        }
        return secret;
    }

    get audience(): string {
        const audience = this.configService.get<string>('JWT_TOKEN_AUDIENCE');
        if (!audience) {
            throw new Error('JWT_TOKEN_AUDIENCE is required. Please set it in your environment variables.');
        }
        return audience;
    }

    get issuer(): string {
        const issuer = this.configService.get<string>('JWT_TOKEN_ISSUER');
        if (!issuer) {
            throw new Error('JWT_TOKEN_ISSUER is required. Please set it in your environment variables.');
        }
        return issuer;
    }

    get accessTokenTtl(): number {
        const ttl = this.configService.get<string>('JWT_TOKEN_TTL');
        return parseInt(ttl ?? '3600');
    }

    get refreshTokenTtl(): number {
        const ttl = this.configService.get<string>('JWT_REFRESH_TOKEN_TTL');
        return parseInt(ttl ?? '86400');
    }
}
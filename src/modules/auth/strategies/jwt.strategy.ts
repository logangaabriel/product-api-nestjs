import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { JwtConfigService } from '../config/jwt-config.service';
import { UsersService } from '../../users/users.service';
import { TokenPayload } from '../interfaces/token-payload.interface';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(
        private readonly jwtConfigService: JwtConfigService,
        private readonly usersService: UsersService,
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: jwtConfigService.secret,
            audience: jwtConfigService.audience,
            issuer: jwtConfigService.issuer,
        });
    }

    async validate(payload: TokenPayload) {
        const user = await this.usersService.findOne(payload.sub);
        
        if (!user || !user.isActive) {
            throw new UnauthorizedException('User account is inactive or does not exist');
        }

        return {
            id: payload.sub,
            email: payload.email,
            isAdmin: payload.isAdmin,
        };
    }
}
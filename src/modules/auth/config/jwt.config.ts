import { registerAs } from "@nestjs/config";

export default registerAs('jwt', () => ({
    secret: process.env.JWT_SECRET,
    audience: process.env.JWT_TOKEN_AUDIENCE,
    issuer: process.env.JWT_TOKEN_ISSUER,
    expiresIn: process.env.JWT_TOKEN_TTL,
    refreshTokenExpiresIn: process.env.JWT_REFRESH_TOKEN_TTL,
}));

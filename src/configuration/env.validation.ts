import { IsNotEmpty, IsUrl, IsNumberString, IsIn, MinLength } from 'class-validator';
import { Transform } from 'class-transformer';

export class EnvironmentVariables {
  // Database
  @IsIn(['postgres'])
  DATABASE_TYPE: string;

  @IsNotEmpty()
  DATABASE_HOST: string;

  @IsNumberString()
  DATABASE_PORT: string;

  @IsNotEmpty()
  DATABASE_USERNAME: string;

  @IsNotEmpty()
  DATABASE_DATABASE: string;

  @IsNotEmpty()
  DATABASE_PASSWORD: string;

  @Transform(({ value }) => value === 'true' || value === '1')
  DATABASE_AUTOLOADENTITIES: boolean;

  @Transform(({ value }) => value === 'true' || value === '1')
  DATABASE_SYNCHRONIZE: boolean;

  // JWT
  @IsNotEmpty()
  @MinLength(32, { message: 'JWT_SECRET deve ter pelo menos 32 caracteres para ser seguro' })
  JWT_SECRET: string;

  @IsUrl()
  @IsNotEmpty()
  JWT_TOKEN_AUDIENCE: string;

  @IsUrl()
  @IsNotEmpty()
  JWT_TOKEN_ISSUER: string;

  @IsNumberString()
  JWT_TOKEN_TTL: string;

  @IsNumberString()
  JWT_REFRESH_TOKEN_TTL: string;
}
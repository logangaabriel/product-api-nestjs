import { IsString, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class RefreshTokenDto {
    @ApiProperty({
        description: 'Token de atualização para renovar o access token',
        example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...'
    })
    @IsString({ message: 'O token de atualização deve ser uma string válida' })
    @IsNotEmpty({ message: 'O token de atualização é obrigatório' })
    refreshToken: string;
}
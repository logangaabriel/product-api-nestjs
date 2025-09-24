import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
    @ApiProperty({
        description: 'Email do usuário',
        example: 'admin@example.com'
    })
    @IsEmail({}, { message: 'Formato de email inválido' })
    @IsNotEmpty({ message: 'O email é obrigatório' })
    email: string;

    @ApiProperty({
        description: 'Senha do usuário',
        example: '123456'
    })
    @IsString({ message: 'A senha deve ser uma string válida' })
    @IsNotEmpty({ message: 'A senha é obrigatória' })
    password: string;
}
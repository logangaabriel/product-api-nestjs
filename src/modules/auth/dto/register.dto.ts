import { IsEmail, IsNotEmpty, IsStrongPassword } from "class-validator";
import { ApiProperty } from '@nestjs/swagger';

export class RegisterDto {
    @ApiProperty({
        description: 'Nome de usuário',
        example: 'João Silva'
    })
    @IsNotEmpty({ message: 'O nome de usuário é obrigatório' })
    username: string;

    @ApiProperty({
        description: 'Email do usuário',
        example: 'joao@example.com'
    })
    @IsEmail({}, { message: 'Formato de email inválido' })
    @IsNotEmpty({ message: 'O email é obrigatório' })
    email: string;

    @ApiProperty({
        description: 'Senha do usuário (mínimo 8 caracteres com maiúsculas, minúsculas, números e símbolos)',
        example: 'MinhaSenh@123'
    })
    @IsStrongPassword(
        {
            minLength: 8,
            minLowercase: 1,
            minUppercase: 1,
            minNumbers: 1,
            minSymbols: 1,
        },
        { message: 'A senha deve ter pelo menos 8 caracteres, incluindo maiúsculas, minúsculas, números e símbolos' }
    )
    @IsNotEmpty({ message: 'A senha é obrigatória' })
    password: string;
}
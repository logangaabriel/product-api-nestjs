import { IsNotEmpty, IsStrongPassword } from "class-validator";

export class ChangePasswordDto {
    @IsNotEmpty({ message: 'A senha atual é obrigatória' })
    currentPassword: string;

    @IsStrongPassword(
        {
            minLength: 8,
            minLowercase: 1,
            minUppercase: 1,
            minNumbers: 1,
            minSymbols: 1,
        },
        { message: 'A nova senha deve ter pelo menos 8 caracteres, incluindo maiúsculas, minúsculas, números e símbolos' }
    )
    @IsNotEmpty({ message: 'A nova senha é obrigatória' })
    newPassword: string;
}
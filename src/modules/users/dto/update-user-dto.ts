import { PartialType, OmitType } from "@nestjs/mapped-types";
import { IsEmail, IsOptional, IsBoolean } from "class-validator";
import { CreateUserDto } from "./create-user-dto";

export class UpdateUserDto extends PartialType(
    OmitType(CreateUserDto, ['password'] as const)
) {
    @IsOptional()
    username?: string;

    @IsOptional()
    @IsEmail({}, { message: 'Formato de email inválido' })
    email?: string;

    @IsOptional()
    @IsBoolean({ message: 'O status ativo deve ser um valor booleano' })
    isActive?: boolean;

    @IsOptional()
    @IsBoolean({ message: 'O status admin deve ser um valor booleano' })
    isAdmin?: boolean;
} 
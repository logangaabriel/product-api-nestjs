import { Column, Entity, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from "typeorm";
import { ApiProperty } from '@nestjs/swagger';

@Entity("users")
export class UsersEntity {
    @ApiProperty({ description: 'ID único do usuário' })
    @PrimaryGeneratedColumn()
    id: number;

    @ApiProperty({ description: 'Nome de usuário' })
    @Column({ length: 100 })
    username: string;

    @ApiProperty({ description: 'Email do usuário' })
    @Column({ length: 100 })
    email: string;

    @ApiProperty({ description: 'Senha hash do usuário' })
    @Column({ length: 100 })
    password: string;

    @ApiProperty({ description: 'Status ativo do usuário' })
    @Column({ default: true })
    isActive: boolean;

    @ApiProperty({ description: 'Se o usuário é administrador' })
    @Column({ default: false })
    isAdmin: boolean;

    @ApiProperty({ description: 'Data de criação' })
    @CreateDateColumn()
    createdAt: Date;

    @ApiProperty({ description: 'Data de última atualização' })
    @UpdateDateColumn()
    updatedAt: Date;
}
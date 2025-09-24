import { Column, Entity, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from "typeorm";
import { ApiProperty } from '@nestjs/swagger';

@Entity("products")
export class Product {
    @ApiProperty({ description: 'ID único do produto' })
    @PrimaryGeneratedColumn()
    id: number;

    @ApiProperty({ description: 'Nome do produto' })
    @Column({ length: 100 })
    name: string;

    @ApiProperty({ description: 'Descrição detalhada do produto' })
    @Column({ type: 'text' })
    description: string;

    @ApiProperty({ description: 'Preço do produto em reais' })
    @Column({ type: 'decimal', precision: 10, scale: 2 })
    price: number;

    @ApiProperty({ description: 'Quantidade em estoque' })
    @Column()
    stock: number;

    @ApiProperty({ description: 'Status ativo do produto' })
    @Column({ default: true })
    isActive: boolean;

    @ApiProperty({ description: 'URL da imagem do produto', required: false })
    @Column({ nullable: true })
    imageUrl?: string;

    @ApiProperty({ description: 'ID do usuário que criou o produto', required: false })
    @Column({ nullable: true })
    createdById?: string;

    @ApiProperty({ description: 'Data de criação' })
    @CreateDateColumn()
    createdAt: Date;

    @ApiProperty({ description: 'Data de última atualização' })
    @UpdateDateColumn()
    updatedAt: Date;
}
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';
import { UsersEntity } from '../../modules/users/entities/users-entities';
import { Product } from '../../modules/products/entities/products-entities';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        type: config.get<'postgres'>('database.type'),
        host: config.get<string>('database.host'),
        port: config.get<number>('database.port'),
        username: config.get<string>('database.username'),
        database: config.get<string>('database.database'),
        password: config.get<string>('database.password'),
        entities: [UsersEntity, Product],
        synchronize: config.get<boolean>('database.synchronize'),
      }),
    }),
  ],
})
export default class DatabaseModule {}

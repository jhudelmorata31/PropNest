import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { resolve } from 'path';
import { getDatabaseConfig } from './database/database-config';
import { databaseEntities } from './database/entities';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { CategoriesModule } from './categories/categories.module';
import { PropertiesModule } from './properties/properties.module';
import { InquiriesModule } from './inquiries/inquiries.module';
import { ImagesModule } from './images/images.module';

@Module({ imports: [
  ConfigModule.forRoot({ isGlobal: true, envFilePath: resolve(__dirname, '../.env') }),
  TypeOrmModule.forRootAsync({
    useFactory: () => ({
      type: 'mysql' as const,
      ...getDatabaseConfig(),
      entities: databaseEntities,
      synchronize: process.env.DB_SYNCHRONIZE === 'true',
      charset: 'utf8mb4',
    }),
  }),
  AuthModule, UsersModule, CategoriesModule, PropertiesModule, InquiriesModule, ImagesModule,
] })
export class AppModule {}

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './users/users.module';
import { User } from './users/users.entity';
import { AuthService } from './auth/auth.service';
import { AuthModule } from './auth/auth.module';
import { JwtGuard } from './auth/guards/jwt.guard';
import { APP_GUARD } from '@nestjs/core';
import { ProductModule } from './product/product.module';
import { Brand } from './product/entities/brand.entity';
import { Shop } from './product/entities/shop.entity';
import { Category } from './product/entities/category.entity';
import { Product } from './product/entities/product.entity';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '1234',
      database: 'takehome',
      entities: [User, Product, Category, Shop, Brand],
      synchronize: true,
    }),
    UsersModule,
    AuthModule,
    ProductModule,
  ],
  controllers: [],
  providers: [
    AuthService,
    {
      provide: APP_GUARD,
      useClass: JwtGuard,
    },
  ],
})
export class AppModule {}

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MenuService } from './menu.service';
import { MenuController } from './menu.controller';
import { Product } from './entities/product.entity';
import { Category } from './entities/category.entity';
import { ProductVariant } from './entities/productVariant.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Product, Category, ProductVariant])],
  controllers: [MenuController],
  providers: [MenuService],
})
export class MenuModule {}
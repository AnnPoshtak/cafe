import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateMenuDto } from './dto/create-menu.dto';
import { UpdateMenuDto } from './dto/update-menu.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './entities/product.entity';
import { Category } from './entities/category.entity';
import * as fs from 'fs/promises';
import * as path from 'path';

@Injectable()
export class MenuService {
  constructor(
    @InjectRepository(Product) private readonly productRepository: Repository<Product>,
    @InjectRepository(Category) private readonly categoryRepository: Repository<Category>,
  ) {}

  async create(createMenuDto: CreateMenuDto, imageName: string | undefined) {
    const category = await this.categoryRepository.findOneBy({ id: +createMenuDto.categoryId });
    if (!category) throw new NotFoundException('Category not found');

    const variants = typeof createMenuDto.variants === 'string' 
      ? JSON.parse(createMenuDto.variants) 
      : createMenuDto.variants;

    const newProduct = this.productRepository.create({
      name: createMenuDto.name,
      description: createMenuDto.description,
      imageUrl: imageName || null,
      category,
      variants,
    });

    return await this.productRepository.save(newProduct);
  }

  async findAll(categorySlug?: string) {
    const queryBuilder = this.productRepository
      .createQueryBuilder('product')
      .leftJoinAndSelect('product.category', 'category')
      .leftJoinAndSelect('product.variants', 'variants');

    if (categorySlug) {
      queryBuilder.where('category.slug = :categorySlug', { categorySlug });
    }

    return await queryBuilder.getMany();
  }

  async findOne(id: number) {
    const product = await this.productRepository.findOne({
      where: { id },
      relations: ['category', 'variants'],
    });

    if (!product) throw new NotFoundException(`Product with ID ${id} not found`);
    return product;
  }

  async update(id: number, updateMenuDto: UpdateMenuDto, imageName?: string) {
    const product = await this.findOne(id);

    if (imageName) {
      await this.deleteImageFile(product.imageUrl);
      product.imageUrl = imageName;
    }

    if (updateMenuDto.categoryId) {
      const category = await this.categoryRepository.findOneBy({ id: +updateMenuDto.categoryId });
      if (!category) throw new NotFoundException('Category not found');
      product.category = category;
    }

    if (updateMenuDto.variants) {
      product.variants = typeof updateMenuDto.variants === 'string'
        ? JSON.parse(updateMenuDto.variants)
        : updateMenuDto.variants;
    }

    this.productRepository.merge(product, {
      name: updateMenuDto.name,
      description: updateMenuDto.description,
    });

    return await this.productRepository.save(product);
  }

  async remove(id: number) {
    const product = await this.findOne(id);
    await this.deleteImageFile(product.imageUrl);
    await this.productRepository.remove(product);
    return { success: true };
  }

  private async deleteImageFile(fileName: string | null) {
    if (!fileName) return;
    const filePath = path.join(__dirname, '..', '..', 'uploads', 'menu', fileName);
    try {
      await fs.unlink(filePath);
    } catch (err) {
      console.error(`Failed to delete file: ${filePath}`, err);
    }
  }
}
import {
  Controller, Get, Post, Body, Patch, Param, Delete, Query,
  UseInterceptors, UploadedFile, BadRequestException,
  UseGuards
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { MenuService } from './menu.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateMenuDto } from './dto/update-menu.dto';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Public } from 'src/auth/decorators/public.decorator';
import { ApiBody, ApiResponse } from '@nestjs/swagger';

@UseGuards(RolesGuard)
@Controller('menu')
export class MenuController {
  constructor(private readonly menuService: MenuService) { }

  @Roles('admin', "barista")
  @Post()
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        name: { type: 'string', example: 'Борщ' },
        description: { type: 'string', example: 'Традиційний український борщ зі сметаною' },
        isAvailable: { type: 'string', example: 'true' },
        categoryId: { type: 'string', example: '1' },
        variants: {
          type: 'string',
          example: '[{"title": "Маленький", "price": 149.99, "sku": "BORSCH-SMALL"}]',
        },
        image: { type: 'string', format: 'binary' },
      },
    },
  })
  @ApiResponse({ status: 400, description: 'Невірні дані' })
  @ApiResponse({ status: 403, description: 'Доступ заборонено' })
  @UseInterceptors(FileInterceptor('image', {
    storage: diskStorage({
      destination: './uploads/menu',
      filename: (req, file, callback) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
        callback(null, `${uniqueSuffix}${extname(file.originalname)}`);
      },
    }),
    fileFilter: (req, file, callback) => {
      if (!file.mimetype.match(/\/(jpg|jpeg|png|webp)$/)) {
        return callback(new BadRequestException('Only image files are allowed (jpg, jpeg, png, webp)!'), false);
      }
      callback(null, true);
    },
    limits: { fileSize: 5 * 1024 * 1024 }
  }))
  create(
    @Body() createProductDto: CreateProductDto,
    @UploadedFile() file?: Express.Multer.File
  ) {
    const imageName = file ? file.filename : undefined;
    return this.menuService.create(createProductDto as any, imageName);
  }

  @Public()
  @Get()
  findAll(@Query('category') categorySlug?: string) {
    return this.menuService.findAll(categorySlug);
  }

  @Public()
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.menuService.findOne(+id);
  }

  @Roles('admin', "barista")
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateProductDto: UpdateMenuDto
  ) {
    return this.menuService.update(+id, updateProductDto);
  }

  @Roles('admin', "barista")
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.menuService.remove(+id);
  }
}
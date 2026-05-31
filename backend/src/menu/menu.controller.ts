import {
  Controller, Get, Post, Body, Patch, Param, Delete, Query,
  UseInterceptors, UploadedFile, BadRequestException
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { MenuService } from './menu.service';
import { CreateMenuDto } from './dto/create-menu.dto';
import { UpdateMenuDto } from './dto/update-menu.dto';

@Controller('menu')
export class MenuController {
  constructor(private readonly menuService: MenuService) { }

  @Post()
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
    @Body() createMenuDto: CreateMenuDto,
    @UploadedFile() file?: Express.Multer.File
  ) {
    const imageName = file ? file.filename : undefined;
    return this.menuService.create(createMenuDto, imageName || undefined);
  }

  @Get()
  findAll(@Query('category') categorySlug?: string) {
    return this.menuService.findAll(categorySlug);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.menuService.findOne(+id);
  }

  @Patch(':id')
  @UseInterceptors(FileInterceptor('image', {
    storage: diskStorage({
      destination: './uploads/menu',
      filename: (req, file, callback) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
        callback(null, `${uniqueSuffix}${extname(file.originalname)}`);
      },
    }),
  }))
  update(
    @Param('id') id: string,
    @Body() updateMenuDto: UpdateMenuDto,
    @UploadedFile() file?: Express.Multer.File
  ) {
    const imageName = file ? file.filename : undefined;
    return this.menuService.update(+id, updateMenuDto, imageName || undefined);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.menuService.remove(+id);
  }
}
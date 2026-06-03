import {
  Controller, Get, Post, Body, Patch, Param, Delete, Query,
  UseInterceptors, UploadedFile, BadRequestException,
  UseGuards
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { MenuService } from './menu.service';
import { CreateMenuDto } from './dto/create-menu.dto';
import { UpdateMenuDto } from './dto/update-menu.dto';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Public } from 'src/auth/decorators/public.decorator';

@UseGuards(RolesGuard)
@Controller('menu')
export class MenuController {
  constructor(private readonly menuService: MenuService) { }

  @Roles('admin')
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

  @Roles('admin')
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

  @Roles('admin')
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.menuService.remove(+id);
  }
}
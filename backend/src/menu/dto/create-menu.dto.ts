import { IsString, IsNotEmpty, IsOptional, IsNumberString, IsArray } from 'class-validator';

export class CreateMenuDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsNumberString()
  @IsNotEmpty()
  categoryId: string;

  @IsNotEmpty()
  variants: any;
}
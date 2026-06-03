import { IsString, IsNotEmpty, IsOptional } from 'class-validator';

export class CreateProductDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsString()
  @IsOptional()
  imageUrl?: string;

  @IsOptional()
  isAvailable?: any; 

  @IsNotEmpty()
  categoryId: string; 

  @IsNotEmpty()
  variants: string; 
}
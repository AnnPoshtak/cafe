import { IsString, IsNumber, IsOptional, Min } from 'class-validator';

export class CreateProductVariantDto {
  @IsString()
  @IsOptional()
  title?: string;

  @IsNumber({ maxDecimalPlaces: 2 })
  @Min(0)
  price: number;

  @IsString()
  @IsOptional()
  sku?: string;
}

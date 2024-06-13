import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateProductDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsNumber()
  price: number;

  @IsNumber()
  categoryId: number;

  @IsNumber()
  shopId: number;

  @IsNumber()
  brandId: number;

  @IsString()
  avatar: string;

  @IsNumber()
  stock: number;
}

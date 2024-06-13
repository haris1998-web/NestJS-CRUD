export class CreateProductDto {
  name: string;
  description: string;
  price: number;
  categoryId: number;
  shopId: number;
  brandId: number;
  avatar: string;
  stock: number;
}

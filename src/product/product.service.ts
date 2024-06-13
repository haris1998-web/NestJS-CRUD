import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { Repository } from 'typeorm';
import { CreateProductDto } from './dtos/create-product.dto';
import { UpdateProductDto } from './dtos/update-product.dto';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
  ) {}

  create(createProductDto: CreateProductDto): Promise<Product> {
    const product = this.productRepository.create(createProductDto);
    return this.productRepository.save(product);
  }

  findAll(): Promise<Product[]> {
    return this.productRepository.find({
      relations: ['category', 'shop', 'brand'],
    });
  }

  findOne(id: number): Promise<Product> {
    return this.productRepository.findOne({ where: { id } });
  }

  update(id: number, updateProductDto: UpdateProductDto): Promise<Product> {
    return this.productRepository.save({ ...updateProductDto, id });
  }

  async remove(id: number): Promise<void> {
    await this.productRepository.delete(id);
  }

  search(keyword: string): Promise<Product[]> {
    return this.productRepository
      .createQueryBuilder('product')
      .where('product.name LIKE :keyword', { keyword: `%${keyword}%` })
      .orWhere('product.description LIKE :keyword', { keyword: `%${keyword}%` })
      .leftJoinAndSelect('product.category', 'category')
      .leftJoinAndSelect('product.shop', 'shop')
      .leftJoinAndSelect('product.brand', 'brand')
      .getMany();
  }
}

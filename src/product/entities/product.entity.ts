import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Shop } from './shop.entity';
import { Brand } from './brand.entity';
import { Category } from './category.entity';

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column('decimal')
  price: number;

  @ManyToOne(() => Shop, (shop) => shop.products)
  shop: Shop;

  @ManyToOne(() => Brand, (brand) => brand.products)
  brand: Brand;

  @ManyToOne(() => Category, (category) => category.products)
  category: Category;

  @Column()
  avatar: string;

  @Column('int')
  stock: number;
}

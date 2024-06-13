import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { UUID } from 'crypto';
import { Product } from './product.entity';

@Entity()
export class Shop {
  @PrimaryGeneratedColumn()
  id: UUID;

  @Column()
  name: string;

  @OneToMany(() => Product, (product) => product.shop)
  products: Product[];
}

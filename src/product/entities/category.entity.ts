import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { UUID } from 'crypto';
import { Product } from './product.entity';

@Entity()
export class Category {
  @PrimaryGeneratedColumn()
  id: UUID;

  @Column()
  name: string;

  @OneToMany(() => Product, (product) => product.category)
  products: Product[];
}

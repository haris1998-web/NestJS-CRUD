import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { UUID } from 'crypto';
import { IsEmail } from 'class-validator';

@Entity({ name: 'user' })
export class User {
  @PrimaryGeneratedColumn()
  id: UUID;

  @Column()
  @IsEmail()
  email: string;

  @Column()
  password: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;
}

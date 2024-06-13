import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './users.entity';
import { Repository, UpdateResult } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async findOneByEmail(email: string): Promise<User> {
    return await this.usersRepository.findOneBy({ email });
  }

  async findOneById(id: number): Promise<User | null> {
    return await this.usersRepository.findOneBy({ id });
  }

  async create(user: User): Promise<User> {
    return await this.usersRepository.save(user);
  }

  async update(
    userId: number,
    userInformation: Partial<User>,
  ): Promise<UpdateResult> {
    return await this.usersRepository.update(userId, userInformation);
  }
}

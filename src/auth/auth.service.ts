import { BadRequestException, Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { User } from '../users/users.entity';
import * as bcrypt from 'bcrypt';
import { AccessToken } from './types/AccessToken';
import { RegisterRequestDto } from './dtos/register-request.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<User> {
    const user: User = await this.usersService.findOneByEmail(email);
    if (!user) {
      throw new BadRequestException('User not found');
    }
    const isMatch: boolean = bcrypt.compareSync(password, user.password);
    if (!isMatch) {
      throw new BadRequestException('Invalid password');
    }
    return user;
  }

  async login(user: User): Promise<AccessToken> {
    const payload = { email: user.email, id: user.id };
    return { accessToken: this.jwtService.sign(payload) };
  }

  async register(user: RegisterRequestDto): Promise<AccessToken> {
    const existingUser = await this.usersService.findOneByEmail(user.email);

    if (existingUser) {
      throw new BadRequestException('User already exists');
    }
    const hashedPassword = await bcrypt.hash(user.password, 10);
    const newUser: User = { ...user, password: hashedPassword };
    await this.usersService.create(newUser);
    return this.login(newUser);
  }
}

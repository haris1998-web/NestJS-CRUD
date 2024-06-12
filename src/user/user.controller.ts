import {
  Body,
  Controller,
  Get,
  Post,
  Put,
  Request,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('register')
  async register(
    @Body() createUserDto: { username: string; password: string; role: string },
  ) {
    return this.userService.create(
      createUserDto.username,
      createUserDto.password,
      createUserDto.role,
    );
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  async getProfile(@Request() req: any) {
    return this.userService.findById(req.user.id);
  }

  @UseGuards(JwtAuthGuard)
  @Put('profile')
  async updateProfile(
    @Request() req: any,
    @Body() updateProfileDto: { profile: string },
  ) {
    await this.userService.updateProfile(req.user.id, updateProfileDto.profile);
    return { success: true };
  }
}

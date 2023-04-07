import { Body, Controller, Get, Post } from '@nestjs/common';
import { Public } from '../auth/auth.constant';
import { Users } from './users.schema';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Public()
  @Post()
  async createUser(@Body() user: Users): Promise<any> {
    await this.usersService.createUser(user);
    return { message: `User ${user.username} created` };
  }

  @Public()
  @Get()
  async getUsers(): Promise<any> {
    return await this.usersService.findAll();
  }
}

import { Body, Controller, Post } from '@nestjs/common';
import { Public } from 'src/auth/auth.constant';
import { ContentDuplicateException } from 'src/common/exceptions/content-duplicate.exception';
import { Users } from './users.schema';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Public()
  @Post()
  async createUser(@Body() user: Users): Promise<any> {
    const userFound: Users = await this.usersService.findByEmail(user.email);
    if (userFound) {
      throw new ContentDuplicateException('E-mail already exists');
    }
    await this.usersService.createUser(user);
    return { message: `User ${user.username} created` };
  }
}

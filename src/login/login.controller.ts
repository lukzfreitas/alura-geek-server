import {
  Body,
  Controller,
  Post,
  HttpStatus,
  HttpCode,
  UseGuards,
} from '@nestjs/common';
import { Public } from '../auth/auth.constant';
// import { AuthService } from '../auth/auth.service';
import { GetCurrentUserUsername } from '../auth/get-current-user-username.decorator';
import { GetCurrentUser } from '../auth/get-current-user.decorator';
import { RefreshTokenAuthGuard } from '../auth/guards/refresh-token-auth.guard';

@Controller('auth')
export class LoginController {
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  constructor() {}

  // @Public()
  @Post('login')
  async login(@Body() { username, password }) {
    return { username, password };
    // return this.authService.login(username, password);
  }

  @Post('logout')
  async logout(@Body() { username }) {
    return username;
    // this.authService.logout(username);
  }

  @Public()
  @UseGuards(RefreshTokenAuthGuard)
  @Post('refresh')
  @HttpCode(HttpStatus.OK)
  async refresh(
    @GetCurrentUserUsername() username: string,
    @GetCurrentUser('refreshToken') refreshToken: string,
  ) {
    return { username, refreshToken };
    // return this.authService.refreshTokens(username, refreshToken);
  }
}

import {
  Body,
  Controller,
  Post,
  HttpStatus,
  HttpCode,
  UseGuards,
} from '@nestjs/common';
import { Public } from 'src/auth/auth.constant';
import { AuthService } from 'src/auth/auth.service';
import { GetCurrentUserUsername } from 'src/auth/get-current-user-username.decorator';
import { GetCurrentUser } from 'src/auth/get-current-user.decorator';
import { RefreshTokenAuthGuard } from 'src/auth/guards/refresh-token-auth.guard';

@Controller('auth')
export class LoginController {
  constructor(private authService: AuthService) {}

  @Public()
  @Post('login')
  async login(@Body() { username, password }) {
    return this.authService.login(username, password);
  }

  @Post('logout')
  async logout(@Body() { username }) {
    this.authService.logout(username);
  }

  @Public()
  @UseGuards(RefreshTokenAuthGuard)
  @Post('refresh')
  @HttpCode(HttpStatus.OK)
  async refresh(
    @GetCurrentUserUsername() username: string,
    @GetCurrentUser('refreshToken') refreshToken: string,
  ) {
    return this.authService.refreshTokens(username, refreshToken);
  }
}

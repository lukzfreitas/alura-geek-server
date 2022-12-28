import {
  Body,
  Controller,
  Post,
  HttpStatus,
  HttpCode,
  UseGuards,
} from '@nestjs/common';
import { Public } from '../auth/auth.constant';
import { AuthService } from '../auth/auth.service';
import { GetCurrentUserUsername } from '../auth/get-current-user-username.decorator';
import { GetCurrentUser } from '../auth/get-current-user.decorator';
import { RefreshTokenAuthGuard } from '../auth/guards/refresh-token-auth.guard';

@Controller('auth')
export class LoginController {
  constructor(private authService: AuthService) {}

  @Public()
  @Post('login')
  async login(@Body() { email, password }) {
    return this.authService.login(email, password);
  }

  @Post('logout')
  async logout(@Body() { email }) {
    this.authService.logout(email);
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

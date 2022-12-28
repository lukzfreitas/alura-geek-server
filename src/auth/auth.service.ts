import { ForbiddenException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigurationService } from '../configuration/configuration.service';
import { Users } from '../users/users.schema';
import { UsersService } from '../users/users.service';
import { JwtPayload } from './types/jtw-payload.type';
import * as argon from 'argon2';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private appConfigService: ConfigurationService,
  ) {}

  async validateUser(email: string, pass: string): Promise<any> {
    const user: Users = await this.usersService.findOne(email);
    if (user && user.password === pass) {
      return user;
    }
    return null;
  }

  async login(email: string, password: string) {
    const userFound: Users = await this.usersService.findByEmail(email);
    const verify = await argon.verify(userFound.password, password);
    if (!userFound || !verify) {
      throw new ForbiddenException('Acccess Denied');
    }
    const tokens = await this.getTokens(userFound);
    const refresh_token = await argon.hash(tokens.refresh_token);
    await this.usersService.updateTokens(email, refresh_token);
    return tokens;
  }

  async logout(email: string) {
    return await this.usersService.updateTokens(email, null);
  }

  async refreshTokens(email: string, refresh_token: string): Promise<any> {
    const user: Users = await this.usersService.findByEmail(email);
    if (!user || !user.refresh_token)
      throw new ForbiddenException('Access Denied');
    const rtMatches = await argon.verify(user.refresh_token, refresh_token);
    if (!rtMatches) throw new ForbiddenException('Access Denied');

    const tokens = await this.getTokens(user);
    await this.updateRefreshToken(user.email, tokens.refresh_token);

    return tokens;
  }

  async updateRefreshToken(email: string, refresh_token: string) {
    const hash = await argon.hash(refresh_token);
    await this.usersService.updateTokens(email, hash);
  }

  async getTokens(user: Users): Promise<any> {
    const jwtPayload: JwtPayload = {
      username: user.username,
      email: user.email,
    };
    const [access_token, refresh_token] = await Promise.all([
      this.jwtService.signAsync(jwtPayload, {
        secret: this.appConfigService.accessTokenSecretKey,
        expiresIn: '15m',
      }),
      this.jwtService.signAsync(jwtPayload, {
        secret: this.appConfigService.refreshTokenSecretKey,
        expiresIn: '7d',
      }),
    ]);

    return {
      access_token,
      refresh_token,
    };
  }
}

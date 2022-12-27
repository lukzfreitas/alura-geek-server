import { Module } from '@nestjs/common';
import { JwtModule, JwtModuleOptions } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { ConfigurationModule } from '../configuration/configuration.module';
import { ConfigurationService } from '../configuration/configuration.service';
import { UsersModule } from '../users/users.module';
import { AuthService } from './auth.service';
import { LocalStrategy } from './strategies/local.strategy';
import { AccessTokenStrategy } from './strategies/access-token.strategy';
import { RefreshTokenStrategy } from './strategies/refresh-token.stategy';

@Module({
  imports: [
    UsersModule,
    PassportModule,
    ConfigurationModule,
    JwtModule.registerAsync({
      imports: [ConfigurationModule],
      inject: [ConfigurationService],
      useFactory: (appConfigService: ConfigurationService) => {
        const options: JwtModuleOptions = {
          secret: appConfigService.accessTokenSecretKey,
        };
        return options;
      },
    }),
  ],
  providers: [
    AuthService,
    LocalStrategy,
    AccessTokenStrategy,
    RefreshTokenStrategy,
  ],
  exports: [AuthService],
})
export class AuthModule {}

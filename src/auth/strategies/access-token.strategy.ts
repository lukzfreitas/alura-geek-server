import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { ConfigurationService } from '../../configuration/configuration.service';
import { JwtPayload } from '../types/jtw-payload.type';

@Injectable()
export class AccessTokenStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(protected configurationService: ConfigurationService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configurationService.accessTokenSecretKey,
    });
  }

  async validate(payload: JwtPayload) {
    return payload;
  }
}

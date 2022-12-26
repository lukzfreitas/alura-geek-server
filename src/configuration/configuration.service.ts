import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class ConfigurationService {
  private readonly _connectionString!: string;
  private readonly _accessTokenSecretKey!: string;
  private readonly _refreshTokenSecretKey!: string;

  get connectionString(): string {
    return this._connectionString;
  }

  get accessTokenSecretKey(): string {
    return this._accessTokenSecretKey;
  }

  get refreshTokenSecretKey(): string {
    return this._refreshTokenSecretKey;
  }

  constructor(private readonly _configService: ConfigService) {
    this._connectionString = this._getConnectionStringFromEnvFile();
    this._accessTokenSecretKey = this._getAccessTokenSecretKeyFromEnvFile();
    this._refreshTokenSecretKey = this._getRefreshTokenSecretKeyFromEnvFile();
  }

  private _getConnectionStringFromEnvFile(): string {
    const connectionString = this._configService.get<string>('MONGODB_DB_URI');
    if (!connectionString) {
      throw new Error(
        'No connection string has been provided in the .env file.',
      );
    }

    return connectionString;
  }

  private _getAccessTokenSecretKeyFromEnvFile(): string {
    const accessTokenSecretKey = this._configService.get<string>(
      'ACCESS_TOKEN_SECRECT_KEY',
    );
    if (!accessTokenSecretKey) {
      throw new Error('No jwt secret key has been provided in the .env file.');
    }
    return accessTokenSecretKey;
  }

  private _getRefreshTokenSecretKeyFromEnvFile(): string {
    const refreshTokenSecretKey = this._configService.get<string>(
      'REFRESH_TOKEN_SECRECT_KEY',
    );
    if (!refreshTokenSecretKey) {
      throw new Error('No jwt secret key has been provided in the .env file.');
    }

    return refreshTokenSecretKey;
  }
}

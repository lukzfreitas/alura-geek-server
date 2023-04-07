import { Module } from '@nestjs/common';
import { MongooseModule, MongooseModuleOptions } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigurationModule } from './configuration/configuration.module';
import { ConfigurationService } from './configuration/configuration.service';
import { ProductModule } from './product/product.module';
import { CategoryModule } from './category/category.module';
import { LoginModule } from './login/login.module';
import { AuthModule } from './auth/auth.module';
import { APP_GUARD } from '@nestjs/core';
import { AccessTokenAuthGuard } from './auth/guards/access-token-auth.guard';
import { IsUserValidatorConstraint } from './users/user.validator';

@Module({
  imports: [
    ProductModule,
    CategoryModule,
    LoginModule,
    AuthModule,
    ConfigurationModule,
    MongooseModule.forRootAsync({
      imports: [ConfigurationModule],
      inject: [ConfigurationService],
      useFactory: (appConfigService: ConfigurationService) => {
        const options: MongooseModuleOptions = {
          uri: appConfigService.connectionString,
          useUnifiedTopology: true,
        };
        return options;
      },
    }),
    CategoryModule,
  ],
  controllers: [AppController],
  providers: [
    IsUserValidatorConstraint,
    AppService,
    {
      provide: APP_GUARD,
      useClass: AccessTokenAuthGuard,
    },
  ],
})
export class AppModule {}

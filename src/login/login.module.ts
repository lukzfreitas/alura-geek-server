import { Module } from '@nestjs/common';
// import { AuthModule } from '../auth/auth.module';
import { LoginController } from './login.controller';

@Module({
  imports: [],
  controllers: [LoginController],
})
export class LoginModule {}

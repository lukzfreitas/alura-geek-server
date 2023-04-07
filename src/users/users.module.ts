import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Users, UsersSchema } from './users.schema';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { IsUserValidatorConstraint } from './user.validator';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Users.name, schema: UsersSchema }]),
  ],
  controllers: [UsersController],
  providers: [UsersService, IsUserValidatorConstraint],
  exports: [UsersService],
})
export class UsersModule {}

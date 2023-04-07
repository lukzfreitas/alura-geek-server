import {
  ValidatorConstraintInterface,
  ValidationOptions,
  registerDecorator,
  ValidatorConstraint,
  ValidationArguments,
} from 'class-validator';
import { Injectable, Type } from '@nestjs/common';
import { InjectConnection } from '@nestjs/mongoose';
import { Connection } from 'mongoose';

@Injectable()
@ValidatorConstraint({ async: true })
export class IsUserValidatorConstraint implements ValidatorConstraintInterface {
  constructor(@InjectConnection() private readonly connection: Connection) {}

  validate(
    username: string,
    args: ValidationArguments,
  ): boolean | Promise<boolean> {
    try {
      return !!!this.connection.models[args.constraints[0].name].findOne({
        username,
      });
    } catch (e) {
      return false;
    }
  }

  defaultMessage() {
    return 'User already exists';
  }
}

export const IsUniqueUser =
  (ModelClass: Type<any>, options?: ValidationOptions) =>
  (object: any, propertyName: string) =>
    registerDecorator({
      name: 'IsUniqueUser',
      target: object.constructor,
      propertyName,
      options,
      constraints: [ModelClass],
      validator: IsUserValidatorConstraint,
    });

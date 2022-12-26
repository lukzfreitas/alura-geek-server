import { HttpException, HttpStatus } from '@nestjs/common';

export class ContentDuplicateException extends HttpException {
  constructor(msg = 'Content duplicated') {
    super(msg, HttpStatus.CONFLICT);
  }
}

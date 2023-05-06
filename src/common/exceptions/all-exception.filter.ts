import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpStatus,
  NotFoundException,
} from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';
import { MongoError } from 'mongodb';

export class MessageError {
  static MESSAGE = 'Internal Server Error';
  static HTTP_STATUS = HttpStatus.INTERNAL_SERVER_ERROR;
}

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  constructor(private readonly httpAdapterHost: HttpAdapterHost) {}

  catch(exception: any, host: ArgumentsHost): void {
    const { httpAdapter } = this.httpAdapterHost;

    const ctx = host.switchToHttp();

    let message: string = exception?.message || MessageError.MESSAGE;
    let httpStatus: number = exception?.status || MessageError.HTTP_STATUS;

    if (exception instanceof MongoError) {
      message = exception.message;
      httpStatus = Number.parseInt(exception.code.toString());
    }
    if (exception instanceof NotFoundException) {
      message = exception?.message;
      httpStatus = exception?.getStatus();
    }

    const responseBody = {
      statusCode: httpStatus,
      timestamp: new Date().toISOString(),
      path: httpAdapter.getRequestUrl(ctx.getRequest()),
      message,
    };

    httpAdapter.reply(ctx.getResponse(), responseBody, httpStatus);
  }
}

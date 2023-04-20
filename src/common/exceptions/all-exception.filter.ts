import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpStatus,
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

    let message: string;
    let httpStatus: number;

    if (exception instanceof MongoError) {
      message = exception.message;
      httpStatus = Number.parseInt(exception.code.toString());
    } else {
      message = exception?.message || MessageError.MESSAGE;
      httpStatus = exception?.getStatus() || MessageError.HTTP_STATUS;
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

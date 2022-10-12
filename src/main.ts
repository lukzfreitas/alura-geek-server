import { INestApplication } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import process from 'process';
import { AppModule } from './app.module';

async function bootstrap() {
  const app: INestApplication = await NestFactory.create(AppModule);
  app.enableCors();
  await app.listen(process.env.Port || 3000);
}
bootstrap();

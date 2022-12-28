import { INestApplication } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app: INestApplication = await NestFactory.create(AppModule);
  app.enableCors({
    allowedHeaders: ['content-type'],
    origin: ['https://alura-geek-omega.vercel.app/', 'http://localhost:3000/'],
    credentials: true,
  });
  await app.listen(process.env.PORT || 3000);
}
bootstrap();

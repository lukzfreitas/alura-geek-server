import { INestApplication } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app: INestApplication = await NestFactory.create(AppModule);
  app.enableCors({
    methods: "GET,PUT,POST,DELETE,UPDATE,OPTIONS",
  })
  await app.listen(process.env.PORT || 3000);
}
bootstrap();

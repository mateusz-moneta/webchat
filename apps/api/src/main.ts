/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import { AppModule } from './app/app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const globalPrefix = 'api';
  const port = process.env.PORT || 3333;
  const config = new DocumentBuilder()
    .setTitle('Webchat')
    .setDescription('Webchat API Node')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);

  app.setGlobalPrefix(globalPrefix);
  app.useGlobalPipes(new ValidationPipe());

  SwaggerModule.setup('api', app, document);

  await app.listen(port);

  Logger.log(
    `🚀 Application is running on: http://localhost:${port}/${globalPrefix}`
  );
}

bootstrap();

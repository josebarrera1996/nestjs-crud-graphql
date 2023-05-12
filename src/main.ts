import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // Pipe para segurar que todos los endpoints de la app esten proteguidos de datos incorrectos
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(3000);
}
bootstrap();

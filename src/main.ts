import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { HttpExceptionHandler } from './exceptions/http-exceptions.handler';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalFilters(new HttpExceptionHandler());
  await app.listen(3000);
}
bootstrap();

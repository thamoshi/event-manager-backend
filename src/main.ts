import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { HttpExceptionHandler } from './exceptions/http-exceptions.handler';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const options = new DocumentBuilder()
    .setTitle('Event Manager API')
    .setDescription('Gerenciamento de locais e eventos')
    .setVersion('1.0')
    .addServer('http://localhost:3000', '')
    .build();

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api-docs', app, document);

  app.useGlobalFilters(new HttpExceptionHandler());
  await app.listen(3000);
}
bootstrap();

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Set up global pipes for validation
  app.useGlobalPipes(
    new ValidationPipe({
      // Strip away any properties that do not have any decorators
      whitelist: true,
      // Throw an error if non-whitelisted values are provided
      forbidNonWhitelisted: true,
    }),
  );

  await app.listen(process.env.PORT ?? 3000);
  console.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();
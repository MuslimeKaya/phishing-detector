// src/main.ts

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const logger = new Logger('Bootstrap');

  console.log()

  const config = new DocumentBuilder()
    .setTitle('Phishing Detector API')
    .setDescription('Phishing ve zararlı uygulama tespiti için API dokümantasyonu')
    .setVersion('1.0')
    .addTag('Data Fetch (For Testing)', 'Manuel veri çekme endpointleri') // Controller'daki tag'i buraya ekleyebilirsin
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  const port = process.env.PORT || 3000;
  await app.listen(port);
  console.log(`Application is running on: http://localhost:${port}`);
  console.log(`Swagger UI is available at: http://localhost:${port}/api`);
}
bootstrap();

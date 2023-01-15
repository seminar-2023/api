/* eslint-disable @typescript-eslint/no-var-requires */
import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { json } from 'express';
import { ConfigService } from './@common/config/config.service';
import { AppModule } from './app.module';

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(AppModule);
  const config = app.get<ConfigService>(ConfigService);

  const { APP_URL_PREFIX, PORT } = config.envConfig;
  const { app: configService } = config;

  app.setGlobalPrefix(APP_URL_PREFIX);
  app.useGlobalPipes(new ValidationPipe());
  app.use(json({ limit: '50mb' }));
  app.enableCors({
    origin: '*',
    methods: '*',
    allowedHeaders: '*',
  });

  const documentBuilder = new DocumentBuilder()
    .setTitle('Seminar')
    .setDescription('Seminar main api')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, documentBuilder);
  SwaggerModule.setup('api', app, document);

  await app.listen(PORT || '3000');
  Logger.log(
    `\n\n\n\nServer running on ${configService.appHostServer}/${APP_URL_PREFIX} with env ${process.env.NODE_ENV}`,
  );
}
bootstrap();

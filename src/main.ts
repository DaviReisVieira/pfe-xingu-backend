import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe, VersioningType } from '@nestjs/common';
import { useContainer } from '@nestjs/class-validator';
import { ConfigService } from '@nestjs/config';
import { TransformInterceptor } from './transform.interceptor';
import validationOptions from './utils/validation-options';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const logger = new Logger();
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    preflightContinue: false,
    optionsSuccessStatus: 204,
    credentials: true,
    exposedHeaders: ['Content-Disposition'],
  });

  useContainer(app.select(AppModule), { fallbackOnErrors: true });
  const configService = app.get(ConfigService);

  app.enableShutdownHooks();
  app.setGlobalPrefix(configService.get('app.apiPrefix'), {
    exclude: ['/'],
  });
  app.enableVersioning({
    type: VersioningType.URI,
  });
  app.useGlobalPipes(new ValidationPipe(validationOptions));
  app.useGlobalInterceptors(new TransformInterceptor());

  const config = new DocumentBuilder()
    .setTitle(configService.get('app.name'))
    .setDescription('API para o PFE Xingu.')
    .setContact(
      'Davi Reis',
      'https://www.linkedin.com/in/davireisvieira/',
      'davirvs@al.insper.edu.br',
    )
    .setVersion('1.0.0')
    .addBearerAuth(
      { type: 'http', scheme: 'bearer', bearerFormat: 'JWT' },
      'access-token',
    )
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('doc', app, document);

  const port = process.env.APP_PORT || 3000;

  await app.listen(configService.get('app.port'));
  logger.log(`Application listening on port ${port}`);
}
bootstrap();

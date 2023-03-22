import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(cookieParser());

  // If any uncaught exception or unhandled rejection occurs, log it to the console
  // and keep the proccess running
  process.on('uncaughtException', (err) => {
    console.error('UNCAUGHT EXCEPTION: ');
    console.error(err);
  });

  process.on('unhandledRejection', (err) => {
    console.error('UNHANDLED REJECTION: ');
    console.error(err);
  });
  app.useGlobalPipes(new ValidationPipe({ transform: true }));
  await app.listen(3000);
}
bootstrap();

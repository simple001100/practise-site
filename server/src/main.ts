import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  try {
    const PORT = process.env.PORT || 3000;
    const app = await NestFactory.create(AppModule);
    app.useGlobalPipes(new ValidationPipe());
    app.use(cookieParser());
    app.enableCors({ credentials: true, origin: process.env.CLIENT_URL });
    await app.listen(PORT ?? 3000, () =>
      console.log('Server started on port: ', PORT),
    );
  } catch (e) {
    console.log(e);
  }
}
bootstrap();

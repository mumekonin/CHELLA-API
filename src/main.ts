import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { prototype } from 'module';
import { ValidationPipe } from '@nestjs/common';

const PORT = 3000;


async function bootstrap() {
  const app = await NestFactory.create(AppModule);


  app.setGlobalPrefix('chella-api');

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true
    })
  )
  await app.listen(process.env.PORT ?? PORT);
}
bootstrap().then(() => {
  console.log('our nestjs server is running ', PORT);
});

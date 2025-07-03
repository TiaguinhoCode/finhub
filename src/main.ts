import { NestFactory } from '@nestjs/core';
import { HttpAdapterHost } from '@nestjs/core';
import { AppModule } from '../dist/app.module';
import { ValidationPipe } from '@nestjs/common';

let app: any;

export default async function handler(req, res) {
  if (!app) {
    const nestApp = await NestFactory.create(AppModule);
    nestApp.setGlobalPrefix('v1');
    nestApp.useGlobalPipes(new ValidationPipe({ whitelist: true }));
    await nestApp.init();

    const adapterHost = nestApp.get(HttpAdapterHost);
    app = adapterHost.httpAdapter.getInstance();
  }

  app(req, res);
}

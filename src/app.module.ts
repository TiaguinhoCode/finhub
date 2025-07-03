// Nest
import { Module } from '@nestjs/common';

// Controler
import { AppController } from './app.controller';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}

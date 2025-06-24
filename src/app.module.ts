// Nest
import { Module } from '@nestjs/common';

// Controller
import { AppController } from './app.controller';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}

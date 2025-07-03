// Nest
import { Module } from '@nestjs/common';

// Controler
import { AppController } from './app.controller';
import { DatabaseModule } from './database/database.module';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}

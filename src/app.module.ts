// Nest
import { Module } from '@nestjs/common';

// Controller
import { AppController } from './app.controller';

// Module
import { UsersModule } from './users/users.module';
import { DatabaseModule } from './database/database.module';

@Module({
  imports: [UsersModule, DatabaseModule],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}

// Nest
import { Module } from '@nestjs/common';

// Controller
import { AppController } from './app.controller';
import { UsersModule } from './users/users.module';

@Module({
  imports: [UsersModule],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}

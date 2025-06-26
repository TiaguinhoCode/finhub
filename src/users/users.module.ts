// Nest
import { Module } from '@nestjs/common';

// Services
import { UsersService } from './users.service';

// Controller
import { UsersController } from './users.controller';

// Module
import { DatabaseModule } from 'src/database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}

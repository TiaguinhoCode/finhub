// Nest
import { forwardRef, Module } from '@nestjs/common';

// Services
import { UsersService } from './users.service';

// Controller
import { UsersController } from './users.controller';

// Module
import { DatabaseModule } from 'src/database/database.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [forwardRef(() => AuthModule), DatabaseModule],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}

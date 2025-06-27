// Nest
import { forwardRef, Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';

// Service
import { AuthService } from './auth.service';

// Controller
import { UsersController } from '../users.controller';

// Module
import { UsersModule } from 'src/users/users.module';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  imports: [
    forwardRef(() => UsersModule),
    DatabaseModule,
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '30d' },
    }),
  ],
  providers: [AuthService],
  exports: [AuthService],
})
export class AuthModule {}

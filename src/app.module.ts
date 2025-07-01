// Nest
import { forwardRef, Module } from '@nestjs/common';

// Controller
import { AppController } from './app.controller';

// Module
import { UsersModule } from './users/users.module';
import { DatabaseModule } from './database/database.module';
import { MailService } from './mail/mail.service';
import { WalletsModule } from './wallets/wallets.module';
import { AuthModule } from './users/auth/auth.module';

@Module({
  imports: [
    UsersModule,
    DatabaseModule,
    WalletsModule,
    forwardRef(() => AuthModule),
  ],
  controllers: [AppController],
  providers: [MailService],
})
export class AppModule {}

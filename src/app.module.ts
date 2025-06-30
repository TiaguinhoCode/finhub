// Nest
import { Module } from '@nestjs/common';

// Controller
import { AppController } from './app.controller';

// Module
import { UsersModule } from './users/users.module';
import { DatabaseModule } from './database/database.module';
import { MailService } from './mail/mail.service';

@Module({
  imports: [UsersModule, DatabaseModule],
  controllers: [AppController],
  providers: [MailService],
})
export class AppModule {}

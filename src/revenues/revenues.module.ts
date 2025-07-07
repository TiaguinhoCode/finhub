import { Module } from '@nestjs/common';
import { RevenuesService } from './revenues.service';
import { RevenuesController } from './revenues.controller';

@Module({
  controllers: [RevenuesController],
  providers: [RevenuesService],
})
export class RevenuesModule {}

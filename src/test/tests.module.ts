// Nest
import { Module } from '@nestjs/common';

// Controller
import { TestController } from './tests.controller';

@Module({
  imports: [],
  controllers: [TestController],
  providers: [],
})
export class TestModule {}

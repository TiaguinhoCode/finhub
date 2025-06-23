import { Module } from '@nestjs/common';
import { TestModule } from './test/tests.module';

@Module({
  imports: [TestModule],
  controllers: [],
  providers: [],
})
export class AppModule {}

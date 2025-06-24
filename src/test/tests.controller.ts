import { Controller, Get } from '@nestjs/common';

@Controller()
export class TestController {
  @Get('test')
  test(): { msg: boolean } {
    return { msg: true };
  }
}

// Nest
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Request,
  Query,
} from '@nestjs/common';
import { UsersService } from './users.service';

// Dtos
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { AuthDto } from './dto/auth.dto';

// Service
import { AuthService } from './auth/auth.service';
import { AuthGuard } from './auth/auth.guard';

@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly authService: AuthService,
  ) {}

  @Post('signup')
  async create(@Body() createUserDto: CreateUserDto) {
    const user = await this.usersService.create(createUserDto);

    return { msg: 'Usuário criado com sucesso', user: user };
  }

  @Post('signin')
  async signIn(@Body() signInDto: AuthDto) {
    const user = await this.authService.signIn(signInDto);

    return { msg: 'Autheticado com sucesso!', user };
  }

  @Get('verify')
  async verifyEmail(@Query('token') token: string) {
    return await this.usersService.verifyEmail(token);
  }

  @UseGuards(AuthGuard)
  @Get('me')
  getProfile(@Request() req) {
    return { msg: 'Usuário autenticado', user: req.user };
  }

  @UseGuards(AuthGuard)
  @Get()
  async findOne(@Query('id') id: string) {
    const user = await this.usersService.findOne(id);

    return { msg: 'ok', user };
  }

  @UseGuards(AuthGuard)
  @Patch()
  async update(@Query('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    const user = this.usersService.update(+id, updateUserDto);

    return { msg: 'Alteração feita com sucesso!', user };
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}

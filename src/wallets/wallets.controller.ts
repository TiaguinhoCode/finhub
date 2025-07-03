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
  Query,
} from '@nestjs/common';

// Service
import { WalletsService } from './wallets.service';

// Dto
import { CreateWalletDto } from './dto/create-wallet.dto';
import { UpdateWalletDto } from './dto/update-wallet.dto';
import { AuthGuard } from 'src/users/auth/auth.guard';

@Controller('wallets')
export class WalletsController {
  constructor(private readonly walletsService: WalletsService) {}

  @UseGuards(AuthGuard)
  @Post()
  async create(@Body() createWalletDto: CreateWalletDto) {
    const wallet = await this.walletsService.create(createWalletDto);

    return { msg: 'Carteira criado com sucesso', wallet };
  }

  @UseGuards(AuthGuard)
  @Get()
  async findAll(@Query('user_id') user_id: string) {
    const wallets = await this.walletsService.findAll(user_id);

    return { msg: 'ok', wallets };
  }

  @UseGuards(AuthGuard)
  @Get(':id')
  async findOne(@Param('id') wallet_id: string) {
    const wallet = await this.walletsService.findOne(wallet_id);

    return { msg: 'ok', wallet };
  }

  @UseGuards(AuthGuard)
  @Patch(':id')
  async update(
    @Param('id') wallet_id: string,
    @Body() updateWalletDto: UpdateWalletDto,
  ) {
    const wallet = await this.walletsService.update(wallet_id, updateWalletDto);

    return { msg: 'Alteração feita com sucesso!', wallet };
  }

  @UseGuards(AuthGuard)
  @Delete(':id')
  async remove(@Param('id') wallet_id: string) {
    const wallet = await this.walletsService.remove(wallet_id);

    return { msg: 'Carteira removido com sucesso!', wallet };
  }
}

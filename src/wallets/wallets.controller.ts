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
  Req,
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
  async create(@Req() req, @Body() data: CreateWalletDto) {
    const wallet = await this.walletsService.create(req.user.id, data);

    return { msg: 'Carteira criado com sucesso', wallet };
  }

  @UseGuards(AuthGuard)
  @Get()
  async findAll(@Req() req) {
    const wallets = await this.walletsService.findAll(req.user.id);

    return { msg: 'ok', wallets };
  }

  @UseGuards(AuthGuard)
  @Get(':id')
  async findOne(@Param('id') wallet_id: string, @Req() req) {
    const wallet = await this.walletsService.findOne(wallet_id, req.user.id);

    return { msg: 'ok', wallet };
  }

  @UseGuards(AuthGuard)
  @Patch(':id')
  async update(
    @Param('id') wallet_id: string,
    @Req() req,
    @Body() data: UpdateWalletDto,
  ) {
    const wallet = await this.walletsService.update(
      wallet_id,
      req.user.id,
      data,
    );

    return { msg: 'Alteração feita com sucesso!', wallet };
  }

  @UseGuards(AuthGuard)
  @Delete(':id')
  async remove(@Param('id') wallet_id: string, @Req() req) {
    const wallet = await this.walletsService.remove(wallet_id, req.user.id);

    return { msg: 'Carteira removido com sucesso!', wallet };
  }
}

// Nest
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UseGuards,
  Request,
} from '@nestjs/common';

// Service
import { RevenuesService } from './revenues.service';

// Middleware
import { AuthGuard } from 'src/users/auth/auth.guard';

// Tipagem
import { CreateRevenueDto } from './dto/create-revenue.dto';
import { UpdateRevenueDto } from './dto/update-revenue.dto';

@Controller('revenues')
export class RevenuesController {
  constructor(private readonly revenuesService: RevenuesService) {}

  @UseGuards(AuthGuard)
  @Post()
  async create(
    @Request() req,
    @Body() data: CreateRevenueDto,
    @Query('until') until?: Date,
  ) {
    const revenue = await this.revenuesService.create(data, req.user.id, until);

    return { msg: 'Receita criada com sucesso', revenue };
  }

  @UseGuards(AuthGuard)
  @Get()
  async findAll(
    @Request() req,
    @Query('wallet_id') wallet_id?: string,
    @Query('realease_start') release_start?: string,
    @Query('realease_end') release_end?: string,
    @Query('due_start') due_start?: string,
    @Query('due_end') due_end?: string,
    @Query('paid') paid?: string,
    @Query('category_id') category_id?: string,
  ) {
    const revenues = await this.revenuesService.findAll({
      wallet_id,
      release_start,
      release_end,
      due_start,
      due_end,
      paid,
      category_id,
      user_id: req.user.id,
    });

    return { msg: 'Receitas encontradas com sucesso!', revenues };
  }

  @UseGuards(AuthGuard)
  @Get(':id')
  async findOne(@Param('id') id: string, @Request() req) {
    const revenue = await this.revenuesService.findOne(id, req.user.id);

    return { msg: 'ok', revenue };
  }

  @UseGuards(AuthGuard)
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() data: UpdateRevenueDto,
    @Request() req,
  ) {
    const revenue = await this.revenuesService.update(id, req.user.id, data);

    return { msg: 'Alteração feita com sucesso!', revenue };
  }

  @UseGuards(AuthGuard)
  @Delete(':id')
  async remove(@Param('id') id: string, @Request() req) {
    const revenue = await this.revenuesService.remove(id, req.user.id);

    return { msg: 'Category removida com sucesso!', revenue };
  }
}

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
  async create(@Body() data: CreateRevenueDto, @Query('until') until?: Date) {
    const revenue = await this.revenuesService.create(data, until);

    return { msg: 'Receita criada com sucesso', revenue };
  }

  @Get()
  async findAll(
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
    });

    return { msg: 'Receitas encontradas com sucesso!', revenues };
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const revenue = await this.revenuesService.findOne(id);

    return { msg: 'ok', revenue };
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() data: UpdateRevenueDto) {
    const revenue = await this.revenuesService.update(id, data);

    return { msg: 'Alteração feita com sucesso!', revenue };
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.revenuesService.remove(+id);
  }
}

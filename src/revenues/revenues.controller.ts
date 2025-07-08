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
} from '@nestjs/common';

// Service
import { RevenuesService } from './revenues.service';

// Tipagem
import { CreateRevenueDto } from './dto/create-revenue.dto';
import { UpdateRevenueDto } from './dto/update-revenue.dto';

@Controller('revenues')
export class RevenuesController {
  constructor(private readonly revenuesService: RevenuesService) {}

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
  ) {
    const revenues = await this.revenuesService.findAll({
      wallet_id,
      release_start,
      release_end,
      due_start,
      due_end,
      paid,
    });

    return { msg: 'Receitas encontradas com sucesso!', revenues };
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.revenuesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateRevenueDto: UpdateRevenueDto) {
    return this.revenuesService.update(+id, updateRevenueDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.revenuesService.remove(+id);
  }
}

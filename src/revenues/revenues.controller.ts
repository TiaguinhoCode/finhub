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
  findAll() {
    return this.revenuesService.findAll();
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

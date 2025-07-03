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
import { CategoryService } from './category.service';

// Dto
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

// Auth
import { AuthGuard } from 'src/users/auth/auth.guard';

@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @UseGuards(AuthGuard)
  @Post()
  async create(@Body() data: CreateCategoryDto) {
    const category = await this.categoryService.create(data);

    return { msg: 'Categoria criada com sucesso', category };
  }

  @Get()
  async findAll(@Query('user_id') user_id: string) {
    const category = await this.categoryService.findAll(user_id);

    return { msg: 'Ok', category };
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const category = await this.categoryService.findOne(id);

    return { msg: 'ok', category };
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() data: UpdateCategoryDto) {
    const category = await this.categoryService.update(id, data);

    return { msg: 'Alteração feita com sucesso!', category };
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    const category = await this.categoryService.remove(id);

    return { msg: 'Category removida com sucesso!', category };
  }
}

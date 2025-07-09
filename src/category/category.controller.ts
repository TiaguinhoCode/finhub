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
  Request,
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
  async create(@Request() req, @Body() data: CreateCategoryDto) {
    const category = await this.categoryService.create(req.user.id, data);

    return { msg: 'Categoria criada com sucesso', category };
  }

  @UseGuards(AuthGuard)
  @Get()
  async findAll(@Request() req) {
    const category = await this.categoryService.findAll(req.user.id);

    return { msg: 'Ok', category };
  }

  @UseGuards(AuthGuard)
  @Get(':id')
  async findOne(@Param('id') id: string, @Request() req) {
    const category = await this.categoryService.findOne(id, req.user.id);

    return { msg: 'ok', category };
  }

  @UseGuards(AuthGuard)
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Request() req,
    @Body() data: UpdateCategoryDto,
  ) {
    const category = await this.categoryService.update(id, data);

    return { msg: 'Alteração feita com sucesso!', category };
  }

  @UseGuards(AuthGuard)
  @Delete(':id')
  async remove(@Param('id') id: string) {
    const category = await this.categoryService.remove(id);

    return { msg: 'Category removida com sucesso!', category };
  }
}

// Nest
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

// Dto
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

// Service
import { PrismaService } from 'src/database/prisma.service';

@Injectable()
export class CategoryService {
  constructor(private readonly client: PrismaService) {}

  async create(data: CreateCategoryDto) {
    const categoryExists = await this.client.category.findFirst({
      where: {
        name: data.name,
        user_id: data.user_id,
      },
    });

    if (categoryExists) throw new BadRequestException('Categoria já existe!');

    const category = await this.client.category.create({ data });

    return category;
  }

  async findAll(user_id: string) {
    const userExits = await this.client.user.findUnique({
      where: { id: user_id },
    });

    if (!userExits) throw new BadRequestException('Usuário não existe');

    const category = await this.client.category.findMany({
      where: { user_id },
    });

    if (!category) throw new NotFoundException('Categoria não encontrada');

    return category;
  }

  findOne(id: number) {
    return `This action returns a #${id} category`;
  }

  update(id: number, updateCategoryDto: UpdateCategoryDto) {
    return `This action updates a #${id} category`;
  }

  remove(id: number) {
    return `This action removes a #${id} category`;
  }
}

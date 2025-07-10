// Nest
import { BadRequestException, Injectable } from '@nestjs/common';

// Tipagem
import { CreateRevenueDto } from './dto/create-revenue.dto';
import { UpdateRevenueDto } from './dto/update-revenue.dto';

// Database
import { PrismaService } from 'src/database/prisma.service';

// Bibliotecas
import { RRule } from 'rrule';

@Injectable()
export class RevenuesService {
  constructor(private readonly client: PrismaService) {}

  async create(data: CreateRevenueDto, until?: Date) {
    const exitsWallet = await this.client.wallet.findUnique({
      where: { id: data.wallet_id },
    });
    const exitsCategory = await this.client.category.findUnique({
      where: { id: data.category_id },
    });

    if (!exitsWallet) throw new BadRequestException('Carteira não existe!');
    if (!exitsCategory) throw new BadRequestException('Categoria não existe!');

    if (data.is_repeat && until) {
      const releaseRule = new RRule({
        freq: RRule.MONTHLY,
        dtstart: new Date(data.realease_date),
        until: until ? new Date(until) : undefined,
      });

      const originalDueDay = data.due_date
        ? new Date(data.due_date).getDate()
        : null;

      const results = releaseRule.all().map((releaseDate, index) => {
        let dueDate: Date | undefined;

        if (originalDueDay) {
          dueDate = new Date(releaseDate);
          dueDate.setDate(originalDueDay);
          if (dueDate.getMonth() !== releaseDate.getMonth()) {
            dueDate = new Date(
              releaseDate.getFullYear(),
              releaseDate.getMonth() + 1,
              0,
            );
          }
        }

        return {
          ...data,
          realease_date: releaseDate,
          due_date: dueDate,
          paid: index === 0 ? (data.paid ?? false) : false,
        };
      });

      await this.client.revenue.createMany({ data: results });

      return results;
    } else {
      const revenue = await this.client.revenue.create({ data });

      return revenue;
    }
  }

  async findAll(filters: {
    wallet_id?: string;
    release_start?: string;
    release_end?: string;
    due_start?: string;
    due_end?: string;
    paid?: string;
    category_id?: string;
  }) {
    const {
      wallet_id,
      release_start,
      release_end,
      due_start,
      due_end,
      paid,
      category_id,
    } = filters;

    const filterPaid =
      paid === 'true' ? true : paid === 'false' ? false : undefined;

    if (
      !wallet_id &&
      !category_id &&
      (!release_start || !release_end) &&
      (!due_start || !due_end)
    ) {
      throw new BadRequestException(
        'Informe wallet_id ou user_id ou intervalo em release ou due ou categoria id',
      );
    }

    const where: any = {};

    if (wallet_id) where.wallet_id = wallet_id;
    if (category_id) where.category_id = wallet_id;
    if (paid) where.paid = filterPaid;
    if (release_start || release_end) {
      where.realease_date = {};
      if (release_start) where.realease_date.gte = release_start;
      if (release_end) where.realease_date.lte = release_end;
    }

    if (due_start || due_end) {
      where.due_date = {};
      if (due_start) where.due_date.gte = due_start;
      if (due_end) where.due_date.lte = due_end;
    }

    const revenues = await this.client.revenue.findMany({ where });

    if (!revenues) throw new BadRequestException('Receitas não encontradas');

    return revenues;
  }

  async findOne(id: string) {
    const revenue = await this.client.revenue.findFirst({ where: { id } });

    return revenue;
  }

  async update(id: string, data: UpdateRevenueDto) {
    const revenue = await this.client.revenue.update({ where: { id }, data });

    if (!revenue) throw new BadRequestException('Receita não econtrada');

    return `This action updates a #${id} revenue`;
  }

  remove(id: number) {
    return `This action removes a #${id} revenue`;
  }
}

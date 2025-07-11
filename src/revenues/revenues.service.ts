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

  async create(data: CreateRevenueDto, user_id: string, until?: Date) {
    const exitsWallet = await this.client.wallet.findFirst({
      where: { AND: [{ id: data.wallet_id }, { user_id }] },
    });
    const exitsCategory = await this.client.category.findFirst({
      where: {
        AND: [
          { id: data.category_id },
          { OR: [{ user_id: null }, { user_id }] },
        ],
      },
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
    user_id: string;
  }) {
    const {
      wallet_id,
      release_start,
      release_end,
      due_start,
      due_end,
      paid,
      category_id,
      user_id,
    } = filters;

    const filterPaid =
      paid === 'true' ? true : paid === 'false' ? false : undefined;

    const where: any = {};

    if (wallet_id) where.wallet_id = wallet_id;
    if (category_id) where.category_id = wallet_id;
    if (paid) where.paid = filterPaid;
    if (release_start || release_end) {
      where.realease_date = {};
      if (release_start) where.realease_date.gte = release_start;
      if (release_end) where.realease_date.lte = release_end;
    }
    if (user_id) where.wallet = { user_id: user_id };

    if (due_start || due_end) {
      where.due_date = {};
      if (due_start) where.due_date.gte = due_start;
      if (due_end) where.due_date.lte = due_end;
    }

    const revenues = await this.client.revenue.findMany({
      where,
      select: {
        id: true,
        description: true,
        value: true,
        is_repeat: true,
        paid: true,
        realease_date: true,
        due_date: true,
        wallet: { select: { id: true, name: true, value: true } },
        category: {
          select: { id: true, name: true, icons: true, color: true },
        },
      },
    });

    if (!revenues) throw new BadRequestException('Receitas não encontradas');

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    for (const rev of revenues) {
      const release = new Date(rev.realease_date);
      release.setHours(0, 0, 0, 0);

      if (release.getTime() === today.getTime() && rev.paid === false) {
        await this.client.revenue.update({
          where: { id: rev.id },
          data: { paid: true },
        });

        await this.client.wallet.update({
          where: { id: rev.wallet.id },
          data: { value: { increment: rev.value } },
        });
        rev.paid;
      }
    }

    return revenues;
  }

  async findOne(id: string, user_id: string) {
    const revenue = await this.client.revenue.findFirst({
      where: { AND: [{ id }, { wallet: { user_id } }] },
      select: {
        id: true,
        description: true,
        value: true,
        is_repeat: true,
        paid: true,
        realease_date: true,
        due_date: true,
        wallet: { select: { id: true, name: true, value: true } },
        category: {
          select: { id: true, name: true, icons: true, color: true },
        },
      },
    });

    if (!revenue) throw new BadRequestException('Receitas não encontradas');

    return revenue;
  }

  async update(id: string, user_id: string, data: UpdateRevenueDto) {
    const existsRevenue = await this.client.revenue.findFirst({
      where: { AND: [{ id }, { wallet: { user_id } }] },
    });

    if (!existsRevenue) throw new BadRequestException('Receita não econtrada');

    const revenue = await this.client.revenue.update({
      where: { id },
      data,
    });

    if (data.is_repeat === false) {
      const dateOriginal = revenue.realease_date;

      const nextMonthStart = new Date(dateOriginal);
      nextMonthStart.setMonth(nextMonthStart.getMonth() + 1, 1);
      nextMonthStart.setHours(0, 0, 0, 0);

      await this.client.revenue.deleteMany({
        where: {
          wallet_id: revenue.wallet_id,
          category_id: revenue.category_id,
          realease_date: { gte: nextMonthStart },
        },
      });
    }

    if (data.paid === true && existsRevenue.paid === false) {
      await this.client.wallet.update({
        where: { id: revenue.wallet_id },
        data: { value: { increment: revenue.value } },
      });
    }

    if (data.paid === false && existsRevenue.paid === true) {
      await this.client.wallet.update({
        where: { id: revenue.wallet_id },
        data: { value: { decrement: revenue.value } },
      });
    }

    return revenue;
  }

  async remove(id: string, user_id) {
    const existsRevenue = await this.client.revenue.findFirst({
      where: { AND: [{ id }, { wallet: { user_id } }] },
    });

    if (!existsRevenue) throw new BadRequestException('Receita não econtrada');

    if (existsRevenue.paid === true) {
      await this.client.wallet.update({
        where: { id: existsRevenue.wallet_id },
        data: { value: { decrement: existsRevenue.value } },
      });
    }

    const revenue = await this.client.revenue.delete({ where: { id } });

    return revenue;
  }
}

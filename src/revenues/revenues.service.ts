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
    const exitsWallet = await this.client.wallet.findFirst({
      where: {
        id: data.wallet_id,
      },
    });

    const exitsCategory = await this.client.category.findFirst({
      where: {
        id: data.category_id,
      },
    });

    if (!exitsWallet) throw new BadRequestException('Carteira não existe!');
    if (!exitsCategory) throw new BadRequestException('Categoria não existe!');

    const frequencyDate = new RRule({
      freq: RRule.MONTHLY,
      dtstart: new Date(data.realease_date),
      until: new Date(until ? until : 0),
    });

    // const revenue = await this.client.revenue.create({
    //   data,
    // });

    return frequencyDate;
  }

  findAll() {
    return `This action returns all revenues`;
  }

  findOne(id: number) {
    return `This action returns a #${id} revenue`;
  }

  update(id: number, updateRevenueDto: UpdateRevenueDto) {
    return `This action updates a #${id} revenue`;
  }

  remove(id: number) {
    return `This action removes a #${id} revenue`;
  }
}

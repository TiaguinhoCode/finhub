// Nest
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

// Service
import { PrismaService } from 'src/database/prisma.service';

// Tipagem
import { CreateWalletDto } from './dto/create-wallet.dto';
import { UpdateWalletDto } from './dto/update-wallet.dto';
import { Wallet } from './entities/wallet.entity';

@Injectable()
export class WalletsService {
  constructor(private readonly client: PrismaService) {}

  async create(createWalletDto: CreateWalletDto) {
    const userExists = await this.client.user.findFirst({
      where: { id: createWalletDto.user_id },
    });

    if (!userExists) throw new BadRequestException(`Usuário não encontrado`);

    const wallet = await this.client.wallet.create({
      data: {
        name: createWalletDto.name,
        value: createWalletDto.value,
        user_id: createWalletDto.user_id,
      },
    });

    return wallet;
  }

  async findAll(user_id: string) {
    if (!user_id) throw new NotFoundException('ID do usário não encontrado');

    const wallets = await this.client.wallet.findMany({
      where: { user_id },
    });

    if (!wallets) throw new NotFoundException(`Usuário não encontrado`);

    return wallets;
  }

  async findOne(wallet_id: string) {
    const wallet = await this.client.wallet.findUnique({
      where: { id: wallet_id },
    });

    if (!wallet) throw new NotFoundException('Carteira não encontrado');

    return wallet;
  }

  async update(wallet_id: string, updateWalletDto: UpdateWalletDto) {
    const wallet = await this.client.wallet.update({
      where: { id: wallet_id },
      data: updateWalletDto,
    });

    return wallet;
  }

  async remove(id: string) {
    const wallet = await this.client.wallet.delete({ where: { id: id } });

    return wallet;
  }
}

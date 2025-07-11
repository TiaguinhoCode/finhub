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

@Injectable()
export class WalletsService {
  constructor(private readonly client: PrismaService) {}

  async create(user_id: string, data: CreateWalletDto) {
    const walletsExists = await this.client.wallet.findFirst({
      where: { user_id, name: data.name },
    });

    if (walletsExists) throw new BadRequestException(`Carteira já existe`);

    const wallet = await this.client.wallet.create({
      data: {
        name: data.name,
        value: data.value,
        user_id,
      },
    });

    return wallet;
  }

  async findAll(user_id: string) {
    const wallets = await this.client.wallet.findMany({
      where: { user_id },
    });

    if (!wallets) throw new BadRequestException(`Usuário não encontrado`);

    return wallets;
  }

  async findOne(wallet_id: string, user_id: string) {
    const wallet = await this.client.wallet.findFirst({
      where: { AND: [{ id: wallet_id }, { user_id }] },
    });

    if (!wallet) throw new BadRequestException('Carteira não encontrado');

    return wallet;
  }

  async update(wallet_id: string, user_id: string, data: UpdateWalletDto) {
    const walletExists = await this.client.wallet.findFirst({
      where: { AND: [{ id: wallet_id, user_id: user_id }] },
    });

    if (!walletExists) throw new BadRequestException('Carteira não existe');

    const wallet = await this.client.wallet.update({
      where: { id: wallet_id },
      data: data,
    });

    return wallet;
  }

  async remove(wallet_id: string, user_id: string) {
    const walletExists = await this.client.wallet.findFirst({
      where: { AND: [{ id: wallet_id, user_id: user_id }] },
    });

    if (!walletExists) throw new BadRequestException('Carteira não existe');

    const wallet = await this.client.wallet.delete({
      where: { id: wallet_id },
    });

    return wallet;
  }
}

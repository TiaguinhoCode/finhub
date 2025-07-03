import { PrismaService } from 'src/database/prisma.service';
import { CreateWalletDto } from './dto/create-wallet.dto';
import { UpdateWalletDto } from './dto/update-wallet.dto';
export declare class WalletsService {
    private readonly client;
    constructor(client: PrismaService);
    create(createWalletDto: CreateWalletDto): Promise<{
        name: string;
        id: string;
        value: import("generated/prisma/runtime/library").Decimal;
        user_id: string;
    }>;
    findAll(user_id: string): Promise<{
        name: string;
        id: string;
        value: import("generated/prisma/runtime/library").Decimal;
        user_id: string;
    }[]>;
    findOne(wallet_id: string): Promise<{
        name: string;
        id: string;
        value: import("generated/prisma/runtime/library").Decimal;
        user_id: string;
    }>;
    update(wallet_id: string, updateWalletDto: UpdateWalletDto): Promise<{
        name: string;
        id: string;
        value: import("generated/prisma/runtime/library").Decimal;
        user_id: string;
    }>;
    remove(id: string): Promise<{
        name: string;
        id: string;
        value: import("generated/prisma/runtime/library").Decimal;
        user_id: string;
    }>;
}

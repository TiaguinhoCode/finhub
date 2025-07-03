import { WalletsService } from './wallets.service';
import { CreateWalletDto } from './dto/create-wallet.dto';
import { UpdateWalletDto } from './dto/update-wallet.dto';
export declare class WalletsController {
    private readonly walletsService;
    constructor(walletsService: WalletsService);
    create(createWalletDto: CreateWalletDto): Promise<{
        msg: string;
        wallet: {
            name: string;
            id: string;
            value: import("generated/prisma/runtime/library").Decimal;
            user_id: string;
        };
    }>;
    findAll(user_id: string): Promise<{
        msg: string;
        wallets: {
            name: string;
            id: string;
            value: import("generated/prisma/runtime/library").Decimal;
            user_id: string;
        }[];
    }>;
    findOne(wallet_id: string): Promise<{
        msg: string;
        wallet: {
            name: string;
            id: string;
            value: import("generated/prisma/runtime/library").Decimal;
            user_id: string;
        };
    }>;
    update(wallet_id: string, updateWalletDto: UpdateWalletDto): Promise<{
        msg: string;
        wallet: {
            name: string;
            id: string;
            value: import("generated/prisma/runtime/library").Decimal;
            user_id: string;
        };
    }>;
    remove(wallet_id: string): Promise<{
        msg: string;
        wallet: {
            name: string;
            id: string;
            value: import("generated/prisma/runtime/library").Decimal;
            user_id: string;
        };
    }>;
}

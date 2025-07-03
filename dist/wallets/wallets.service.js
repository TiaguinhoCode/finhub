"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WalletsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../database/prisma.service");
let WalletsService = class WalletsService {
    client;
    constructor(client) {
        this.client = client;
    }
    async create(createWalletDto) {
        const userExists = await this.client.user.findFirst({
            where: { id: createWalletDto.user_id },
        });
        if (!userExists)
            throw new common_1.BadRequestException(`Usuário não encontrado`);
        const wallet = await this.client.wallet.create({
            data: {
                name: createWalletDto.name,
                value: createWalletDto.value,
                user_id: createWalletDto.user_id,
            },
        });
        return wallet;
    }
    async findAll(user_id) {
        if (!user_id)
            throw new common_1.NotFoundException('ID do usário não encontrado');
        const wallets = await this.client.wallet.findMany({
            where: { user_id },
        });
        if (!wallets)
            throw new common_1.NotFoundException(`Usuário não encontrado`);
        return wallets;
    }
    async findOne(wallet_id) {
        const wallet = await this.client.wallet.findUnique({
            where: { id: wallet_id },
        });
        if (!wallet)
            throw new common_1.NotFoundException('Carteira não encontrado');
        return wallet;
    }
    async update(wallet_id, updateWalletDto) {
        const wallet = await this.client.wallet.update({
            where: { id: wallet_id },
            data: updateWalletDto,
        });
        return wallet;
    }
    async remove(id) {
        const wallet = await this.client.wallet.delete({ where: { id: id } });
        return wallet;
    }
};
exports.WalletsService = WalletsService;
exports.WalletsService = WalletsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], WalletsService);
//# sourceMappingURL=wallets.service.js.map
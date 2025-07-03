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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WalletsController = void 0;
const common_1 = require("@nestjs/common");
const wallets_service_1 = require("./wallets.service");
const create_wallet_dto_1 = require("./dto/create-wallet.dto");
const update_wallet_dto_1 = require("./dto/update-wallet.dto");
const auth_guard_1 = require("../users/auth/auth.guard");
let WalletsController = class WalletsController {
    walletsService;
    constructor(walletsService) {
        this.walletsService = walletsService;
    }
    async create(createWalletDto) {
        const wallet = await this.walletsService.create(createWalletDto);
        return { msg: 'Carteira criado com sucesso', wallet };
    }
    async findAll(user_id) {
        const wallets = await this.walletsService.findAll(user_id);
        return { msg: 'ok', wallets };
    }
    async findOne(wallet_id) {
        const wallet = await this.walletsService.findOne(wallet_id);
        return { msg: 'ok', wallet };
    }
    async update(wallet_id, updateWalletDto) {
        const wallet = await this.walletsService.update(wallet_id, updateWalletDto);
        return { msg: 'Alteração feita com sucesso!', wallet };
    }
    async remove(wallet_id) {
        const wallet = await this.walletsService.remove(wallet_id);
        return { msg: 'Carteira removido com sucesso!', wallet };
    }
};
exports.WalletsController = WalletsController;
__decorate([
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_wallet_dto_1.CreateWalletDto]),
    __metadata("design:returntype", Promise)
], WalletsController.prototype, "create", null);
__decorate([
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)('user_id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], WalletsController.prototype, "findAll", null);
__decorate([
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], WalletsController.prototype, "findOne", null);
__decorate([
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_wallet_dto_1.UpdateWalletDto]),
    __metadata("design:returntype", Promise)
], WalletsController.prototype, "update", null);
__decorate([
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], WalletsController.prototype, "remove", null);
exports.WalletsController = WalletsController = __decorate([
    (0, common_1.Controller)('wallets'),
    __metadata("design:paramtypes", [wallets_service_1.WalletsService])
], WalletsController);
//# sourceMappingURL=wallets.controller.js.map
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
exports.CategoryService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../database/prisma.service");
let CategoryService = class CategoryService {
    client;
    constructor(client) {
        this.client = client;
    }
    async create(data) {
        const categoryExists = await this.client.category.findFirst({
            where: {
                name: data.name,
                user_id: data.user_id,
            },
        });
        if (categoryExists)
            throw new common_1.BadRequestException('Categoria já existe!');
        const category = await this.client.category.create({ data });
        return category;
    }
    async findAll(user_id) {
        const userExits = await this.client.user.findUnique({
            where: { id: user_id },
        });
        if (!userExits)
            throw new common_1.BadRequestException('Usuário não existe');
        const category = await this.client.category.findMany({
            where: { user_id },
        });
        if (!category)
            throw new common_1.NotFoundException('Categoria não encontrada');
        return category;
    }
    async findOne(id) {
        const category = await this.client.category.findUnique({
            where: { id },
        });
        if (!category)
            throw new common_1.NotFoundException('Categoria não existe');
        return category;
    }
    async update(id, data) {
        const category = await this.client.category.update({
            where: { id },
            data,
        });
        if (!category)
            throw new common_1.BadRequestException('Categoria não existe');
        return category;
    }
    async remove(id) {
        const category = await this.client.category.delete({ where: { id } });
        if (!category)
            throw new common_1.BadRequestException('Categoria não existe');
        return category;
    }
};
exports.CategoryService = CategoryService;
exports.CategoryService = CategoryService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], CategoryService);
//# sourceMappingURL=category.service.js.map
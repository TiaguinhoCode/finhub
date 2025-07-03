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
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const bcrypt_1 = require("bcrypt");
const prisma_service_1 = require("../../database/prisma.service");
let AuthService = class AuthService {
    client;
    jwtService;
    constructor(client, jwtService) {
        this.client = client;
        this.jwtService = jwtService;
    }
    async signIn(data) {
        const user = await this.client.user.findFirst({
            where: { email: data.email },
        });
        if (!user?.email) {
            throw new common_1.NotFoundException('Usuário não cadastrado');
        }
        const passwordMatch = await (0, bcrypt_1.compare)(data.password, user.password);
        if (!passwordMatch) {
            throw new common_1.UnauthorizedException('Senha incorreta');
        }
        const payload = {
            id: user.id,
            name: user.name,
            surname: user.surname,
            email: user.email,
            phone: user.phone,
            photo: user.photo,
            checked: user.checked,
            validation_id: user.validation_id,
            created_at: user.created_at,
            updated_at: user.updated_at,
        };
        return {
            user: {
                id: user.id,
                name: user.name,
                surname: user.surname,
                email: user.email,
                phone: user.phone,
                photo: user.photo,
                checked: user.checked,
                validation_id: user.validation_id,
                created_at: user.created_at,
                updated_at: user.updated_at,
            },
            access_token: await this.jwtService.signAsync(payload),
        };
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        jwt_1.JwtService])
], AuthService);
//# sourceMappingURL=auth.service.js.map
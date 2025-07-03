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
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const bcrypt_1 = require("bcrypt");
const prisma_service_1 = require("../database/prisma.service");
const mail_service_1 = require("../mail/mail.service");
let UsersService = class UsersService {
    client;
    mailService;
    constructor(client, mailService) {
        this.client = client;
        this.mailService = mailService;
    }
    async create(data) {
        const emailExists = await this.client.user.findFirst({
            where: { email: data.email },
        });
        if (emailExists) {
            throw new common_1.BadRequestException('Email já cadastrado');
        }
        const passawordHash = await (0, bcrypt_1.hash)(data.password, 10);
        const user = await this.client.user.create({
            data: {
                name: data.name,
                surname: data.surname,
                photo: data.photo || null,
                email: data.email,
                password: passawordHash,
                phone: data.phone,
            },
            omit: { password: true },
        });
        const link = `http://localhost:3000/v1/users/verify?token=${user.validation_id}`;
        await this.mailService.sendEmail(user.email, '🔒 Confirme seu e‑mail para ativar sua conta FinHub', `
        <p>Olá ${user.name} ${user.surname}!</p>
        <p>Obrigado por criar sua conta na FinHub. Para ativar seu acesso, basta confirmar seu e‑mail clicando no botão abaixo:</p>
        <p style="text-align:center;">
          <a href="${link}" style="background-color:#007BFF;color:#ffffff;
            padding:10px 20px;text-decoration:none;border-radius:4px;">
            CONFIRMAR E‑MAIL
          </a>
        </p>
        <p>Se o botão não funcionar, copie e cole este link no seu navegador:<br/>  
          <a href="${link}">${link}</a>
        </p>
        <p>🔔 Esse link expira em 24 horas. Após esse período, será necessário solicitar outro.</p>
        <p>Se você não solicitou esse e‑mail, pode ignorar esta mensagem sem problemas.</p>
        <p>Atenciosamente,<br/>Equipe FinHub</p>
      `);
        return user;
    }
    async verifyEmail(token) {
        if (!token)
            throw new common_1.BadRequestException('Token é obrigatório para verificação');
        const user = await this.client.user.findUnique({
            where: { validation_id: token },
        });
        if (!user)
            throw new common_1.BadRequestException('Token inválido');
        const today = new Date();
        const createdAt = user.created_at;
        const hoursPassed = (today.getTime() - createdAt.getTime()) / 1000 / 60 / 60;
        if (hoursPassed > 24) {
            await this.client.user.delete({ where: { id: user.id } });
            throw new common_1.BadRequestException('Token expirado — cadastro removido');
        }
        await this.client.user.update({
            where: { id: user.id },
            data: {
                checked: true,
                validation_id: null,
            },
        });
        return { msg: 'E‑mail verificado com sucesso!' };
    }
    async findOne(id) {
        const user = await this.client.user.findUnique({
            where: { id: id },
            omit: { password: true },
        });
        if (!user)
            throw new common_1.NotFoundException(`Usuário com id ${id} não encontrado`);
        return user;
    }
    async update(id, updateUserDto) {
        const exists = await this.client.user.findUnique({ where: { id } });
        if (!exists)
            throw new common_1.NotFoundException('Usuário não encontrado');
        const data = {
            ...updateUserDto,
            ...(updateUserDto.password
                ? { password: await (0, bcrypt_1.hash)(updateUserDto.password, 10) }
                : {}),
        };
        const user = await this.client.user.update({
            where: { id },
            data,
            omit: { password: true },
        });
        return user;
    }
    async remove(id) {
        const exists = await this.client.user.findUnique({ where: { id } });
        if (!exists)
            throw new common_1.NotFoundException('Usuário não encontrado');
        const user = await this.client.user.delete({
            where: { id: id },
            omit: { password: true },
        });
        return user;
    }
};
exports.UsersService = UsersService;
exports.UsersService = UsersService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        mail_service_1.MailService])
], UsersService);
//# sourceMappingURL=users.service.js.map
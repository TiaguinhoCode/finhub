// Nest
import {
  BadRequestException,
  Injectable,
  NotFoundException,
  Query,
} from '@nestjs/common';

// Dto
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

// Entidades
import { User } from './entities/user.entity';

// Bibliotecas
import { hash } from 'bcrypt';
import { PrismaService } from 'src/database/prisma.service';
import { MailService } from 'src/mail/mail.service';

@Injectable()
export class UsersService {
  constructor(
    private readonly client: PrismaService,
    private mailService: MailService,
  ) {}

  async create(data: CreateUserDto): Promise<User> {
    const emailExists = await this.client.user.findFirst({
      where: { email: data.email },
    });

    if (emailExists) {
      throw new BadRequestException('Email já cadastrado');
    }

    const passawordHash = await hash(data.password, 10);

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
    await this.mailService.sendEmail(
      user.email,
      '🔒 Confirme seu e‑mail para ativar sua conta FinHub',
      `
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
      `,
    );

    return user;
  }

  async verifyEmail(token: string) {
    if (!token)
      throw new BadRequestException('Token é obrigatório para verificação');

    const user = await this.client.user.findUnique({
      where: { validation_id: token },
    });

    if (!user) throw new BadRequestException('Token inválido');

    const today = new Date();
    const createdAt = user.created_at as Date;
    const hoursPassed =
      (today.getTime() - createdAt.getTime()) / 1000 / 60 / 60;

    if (hoursPassed > 24) {
      await this.client.user.delete({ where: { id: user.id } });
      throw new BadRequestException('Token expirado — cadastro removido');
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

  async findOne(id: string): Promise<User> {
    const user = await this.client.user.findUnique({
      where: { id: id },
      omit: { password: true },
    });

    if (!user)
      throw new NotFoundException(`Usuário com id ${id} não encontrado`);

    return user;
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const exists = await this.client.user.findUnique({ where: { id } });

    if (!exists) throw new NotFoundException('Usuário não encontrado');

    const data: any = {
      ...updateUserDto,
      ...(updateUserDto.password
        ? { password: await hash(updateUserDto.password, 10) }
        : {}),
    };

    const user = await this.client.user.update({
      where: { id },
      data,
      omit: { password: true },
    });

    return user;
  }

  async remove(id: string) {
    const exists = await this.client.user.findUnique({ where: { id } });

    if (!exists) throw new NotFoundException('Usuário não encontrado');

    const user = await this.client.user.delete({
      where: { id: id },
      omit: { password: true },
    });

    return user;
  }
}

// Nest
import {
  Injectable,
  UnauthorizedException,
  NotFoundException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

// Bibliotecas
import { compare } from 'bcrypt';

// Service
import { PrismaService } from 'src/database/prisma.service';

// Tipagem
import { AuthDto } from '../dto/auth.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly client: PrismaService,
    private jwtService: JwtService,
  ) {}

  async signIn(data: AuthDto): Promise<{ user; access_token: string }> {
    const user = await this.client.user.findFirst({
      where: { email: data.email },
    });

    if (!user?.email) {
      throw new NotFoundException('Usuário não cadastrado');
    }

    const passwordMatch = await compare(data.password, user.password);
    if (!passwordMatch) {
      throw new UnauthorizedException('Senha incorreta');
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
}

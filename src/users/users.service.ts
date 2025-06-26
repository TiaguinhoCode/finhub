// Nest
import { BadRequestException, Inject, Injectable } from '@nestjs/common';

// Dto
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

// Entidades
import { User } from './entities/user.entity';

// Bibliotecas
import { hash } from 'bcrypt';
import { PrismaService } from 'src/database/prisma.service';

@Injectable()
export class UsersService {
  constructor(private readonly client: PrismaService) {}

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

    return user;
  }

  findAll() {
    return `This action returns all users`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}

import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { PrismaService } from 'src/database/prisma.service';
import { MailService } from 'src/mail/mail.service';
export declare class UsersService {
    private readonly client;
    private mailService;
    constructor(client: PrismaService, mailService: MailService);
    create(data: CreateUserDto): Promise<User>;
    verifyEmail(token: string): Promise<{
        msg: string;
    }>;
    findOne(id: string): Promise<User>;
    update(id: string, updateUserDto: UpdateUserDto): Promise<{
        name: string;
        surname: string;
        photo: string | null;
        email: string;
        phone: string;
        id: string;
        checked: boolean | null;
        validation_id: string | null;
        created_at: Date | null;
        updated_at: Date | null;
    }>;
    remove(id: string): Promise<{
        name: string;
        surname: string;
        photo: string | null;
        email: string;
        phone: string;
        id: string;
        checked: boolean | null;
        validation_id: string | null;
        created_at: Date | null;
        updated_at: Date | null;
    }>;
}

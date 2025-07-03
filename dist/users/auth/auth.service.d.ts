import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/database/prisma.service';
import { AuthDto } from '../dto/auth.dto';
export declare class AuthService {
    private readonly client;
    private jwtService;
    constructor(client: PrismaService, jwtService: JwtService);
    signIn(data: AuthDto): Promise<{
        user: any;
        access_token: string;
    }>;
}

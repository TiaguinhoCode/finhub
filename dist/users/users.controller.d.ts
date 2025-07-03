import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { AuthDto } from './dto/auth.dto';
import { AuthService } from './auth/auth.service';
export declare class UsersController {
    private readonly usersService;
    private readonly authService;
    constructor(usersService: UsersService, authService: AuthService);
    create(createUserDto: CreateUserDto): Promise<{
        msg: string;
        user: import("./entities/user.entity").User;
    }>;
    signIn(signInDto: AuthDto): Promise<{
        msg: string;
        user: {
            user: any;
            access_token: string;
        };
    }>;
    verifyEmail(token: string): Promise<{
        msg: string;
    }>;
    getProfile(req: any): {
        msg: string;
        user: any;
    };
    findOne(id: string): Promise<{
        msg: string;
        user: import("./entities/user.entity").User;
    }>;
    update(id: string, dto: UpdateUserDto): Promise<{
        msg: string;
        user: {
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
        };
    }>;
    remove(id: string): Promise<{
        msg: string;
        user: {
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
        };
    }>;
}

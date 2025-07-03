import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { PrismaService } from 'src/database/prisma.service';
export declare class CategoryService {
    private readonly client;
    constructor(client: PrismaService);
    create(data: CreateCategoryDto): Promise<{
        name: string;
        id: string;
        created_at: Date | null;
        updated_at: Date | null;
        user_id: string | null;
        color: string;
        icons: string;
    }>;
    findAll(user_id: string): Promise<{
        name: string;
        id: string;
        created_at: Date | null;
        updated_at: Date | null;
        user_id: string | null;
        color: string;
        icons: string;
    }[]>;
    findOne(id: string): Promise<{
        name: string;
        id: string;
        created_at: Date | null;
        updated_at: Date | null;
        user_id: string | null;
        color: string;
        icons: string;
    }>;
    update(id: string, data: UpdateCategoryDto): Promise<{
        name: string;
        id: string;
        created_at: Date | null;
        updated_at: Date | null;
        user_id: string | null;
        color: string;
        icons: string;
    }>;
    remove(id: string): Promise<{
        name: string;
        id: string;
        created_at: Date | null;
        updated_at: Date | null;
        user_id: string | null;
        color: string;
        icons: string;
    }>;
}

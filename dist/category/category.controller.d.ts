import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
export declare class CategoryController {
    private readonly categoryService;
    constructor(categoryService: CategoryService);
    create(data: CreateCategoryDto): Promise<{
        msg: string;
        category: {
            name: string;
            id: string;
            created_at: Date | null;
            updated_at: Date | null;
            user_id: string | null;
            color: string;
            icons: string;
        };
    }>;
    findAll(user_id: string): Promise<{
        msg: string;
        category: {
            name: string;
            id: string;
            created_at: Date | null;
            updated_at: Date | null;
            user_id: string | null;
            color: string;
            icons: string;
        }[];
    }>;
    findOne(id: string): Promise<{
        msg: string;
        category: {
            name: string;
            id: string;
            created_at: Date | null;
            updated_at: Date | null;
            user_id: string | null;
            color: string;
            icons: string;
        };
    }>;
    update(id: string, data: UpdateCategoryDto): Promise<{
        msg: string;
        category: {
            name: string;
            id: string;
            created_at: Date | null;
            updated_at: Date | null;
            user_id: string | null;
            color: string;
            icons: string;
        };
    }>;
    remove(id: string): Promise<{
        msg: string;
        category: {
            name: string;
            id: string;
            created_at: Date | null;
            updated_at: Date | null;
            user_id: string | null;
            color: string;
            icons: string;
        };
    }>;
}

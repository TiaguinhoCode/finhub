// Nest
import { IsNotEmpty, IsOptional } from 'class-validator';

export class CreateCategoryDto {
  @IsNotEmpty({ message: 'Nome não pode estar vazio' })
  name: string;

  @IsNotEmpty({ message: 'Cor não pode estar vazio' })
  color: string;

  @IsNotEmpty({ message: 'Cor não pode estar vazio' })
  icons: string;

  @IsOptional()
  user_id: string;
}

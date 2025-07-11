// Nest
import { IsNotEmpty, IsOptional } from 'class-validator';

export class CreateRevenueDto {
  @IsNotEmpty({ message: 'Descrição não pode estar vazio' })
  description: string;

  @IsNotEmpty({ message: 'Valor não pode estar vazio' })
  value: number;

  @IsOptional()
  is_repeat?: boolean;

  @IsOptional()
  paid?: boolean;

  @IsNotEmpty({ message: 'Data recente não pode estar vazio' })
  realease_date: Date;

  @IsOptional()
  due_date?: Date;

  @IsNotEmpty({ message: 'ID da carteira não pode estar vazio' })
  wallet_id: string;

  @IsNotEmpty({ message: 'ID da categoria não pode estar vazio' })
  category_id: string;
}

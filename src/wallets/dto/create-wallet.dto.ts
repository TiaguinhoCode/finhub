// Nest
import { IsNotEmpty } from 'class-validator';

export class CreateWalletDto {
  @IsNotEmpty({ message: 'Nome não pode estar vazio' })
  name: string;

  @IsNotEmpty({ message: 'Valor não pode estar vazio' })
  value: number;

  @IsNotEmpty({ message: 'ID do usuário não pode estar vazio' })
  user_id: string;
}

// Nest
import { IsNotEmpty, IsOptional, Matches, MinLength } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty({ message: 'Nome não pode estar vazio' })
  name: string;

  @IsNotEmpty({ message: 'Sobrenome não pode estar vazio' })
  surname: string;

  @IsOptional()
  photo?: string | null;

  @IsNotEmpty({ message: 'Sobrenome não pode estar vazio' })
  email: string;

  @IsNotEmpty({ message: 'Senha não pode estar vazia' })
  @MinLength(8, { message: 'Senha deve ter ao menos 8 caracteres' })
  @Matches(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\W).+$/, {
    message:
      'Senha precisa ter 1 maiúscula, 1 minúscula e 1 caractere especial',
  })
  password: string;

  @IsNotEmpty({ message: 'Telefone não pode estar vazio' })
  phone: string;
}

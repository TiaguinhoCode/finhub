// Nest
import { PartialType } from '@nestjs/mapped-types';

<<<<<<< HEAD

=======
// DTO
>>>>>>> development
import { CreateUserDto } from './create-user.dto';

export class UpdateUserDto extends PartialType(CreateUserDto) {}

// Nest
import { PartialType } from '@nestjs/mapped-types';

// DTO
import { CreateUserDto } from './create-user.dto';

export class UpdateUserDto extends PartialType(CreateUserDto) {}

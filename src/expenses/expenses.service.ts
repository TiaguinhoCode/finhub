// Nest
import { Injectable } from '@nestjs/common';

// Tipagem
import { CreateExpenseDto } from './dto/create-expense.dto';
import { UpdateExpenseDto } from './dto/update-expense.dto';

// database
import { PrismaService } from 'src/database/prisma.service';

@Injectable()
export class ExpensesService {
  constructor(private readonly client: PrismaService) {}

  create(data: CreateExpenseDto) {
    return 'This action adds a new expense';
  }

  findAll() {
    return `This action returns all expenses`;
  }

  findOne(id: number) {
    return `This action returns a #${id} expense`;
  }

  update(id: number, updateExpenseDto: UpdateExpenseDto) {
    return `This action updates a #${id} expense`;
  }

  remove(id: number) {
    return `This action removes a #${id} expense`;
  }
}

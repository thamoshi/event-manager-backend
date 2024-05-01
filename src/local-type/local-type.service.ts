import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class LocalTypeService {
  constructor(private readonly databaseService: DatabaseService) {}

  async create(createLocalTypeDto: Prisma.LocalTypeCreateInput) {
    return this.databaseService.localType.create({ data: createLocalTypeDto });
  }

  async findAll() {
    return this.databaseService.localType.findMany();
  }

  async findOne(id: number) {
    return this.databaseService.localType.findUnique({
      where: {
        id,
      },
    });
  }

  async update(id: number, updateLocalTypeDto: Prisma.LocalTypeUpdateInput) {
    return this.databaseService.localType.update({
      where: {
        id,
      },
      data: updateLocalTypeDto,
    });
  }

  async remove(id: number) {
    return this.databaseService.localType.delete({
      where: {
        id,
      },
    });
  }
}

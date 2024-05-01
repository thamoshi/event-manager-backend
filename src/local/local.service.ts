import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class LocalService {
  constructor(private readonly databaseService: DatabaseService) {}

  async create(createLocalDto: Prisma.LocalCreateInput) {
    return this.databaseService.local.create({ data: createLocalDto });
  }

  async findAll() {
    return this.databaseService.local.findMany();
  }

  async findOne(id: number) {
    return this.databaseService.local.findUnique({
      where: {
        id,
      },
      include: {
        localInformation: true,
        localType: true,
        gates: true,
      },
    });
  }

  async update(id: number, updateLocalDto: Prisma.LocalUpdateInput) {
    return this.databaseService.local.update({
      where: {
        id,
      },
      data: updateLocalDto,
    });
  }

  async remove(id: number) {
    return this.databaseService.local.delete({
      where: {
        id,
      },
    });
  }
}

import { Injectable } from '@nestjs/common';
import { Local, Prisma } from '@prisma/client';
import { DatabaseService } from 'src/database/database.service';
import { LocalDto } from './dto/local.dto';
import { LocalMapper } from './mapper/local.mapper';

@Injectable()
export class LocalService {
  constructor(private readonly databaseService: DatabaseService) {}

  async create(createLocalDto: LocalDto): Promise<Local> {
    const mapper = new LocalMapper();
    const create: Prisma.LocalCreateInput =
      await mapper.createDtoToModel(createLocalDto);
    return this.databaseService.local.create({
      data: create,
    });
  }

  async findAll(): Promise<Local[]> {
    return this.databaseService.local.findMany({
      include: {
        localType: true,
        localInformation: true,
        gates: true,
      },
    });
  }

  async findOne(id: number): Promise<Local> {
    return this.databaseService.local.findUnique({
      where: {
        id,
      },
      include: {
        localType: true,
        localInformation: true,
        gates: true,
      },
    });
  }

  async update(localId: number, updateLocalDto: LocalDto): Promise<Local> {
    const mapper = new LocalMapper();
    const updateLocalData: Prisma.LocalUpdateInput =
      await mapper.updateDtoToModel(updateLocalDto);
    await this.databaseService.gate.deleteMany({ where: { localId } });
    return this.databaseService.local.update({
      where: {
        id: localId,
      },
      data: updateLocalData,
    });
  }

  async remove(id: number): Promise<Local> {
    return this.databaseService.local.delete({
      where: {
        id,
      },
    });
  }
}

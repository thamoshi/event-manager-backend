import { HttpException, Injectable } from '@nestjs/common';
import { Local, Prisma } from '@prisma/client';
import { DatabaseService } from 'src/database/database.service';
import { CreateLocalDto } from './dto/create-local.dto';

@Injectable()
export class LocalService {
  constructor(private readonly databaseService: DatabaseService) {}

  async create(createLocalDto: CreateLocalDto): Promise<Local> {
    try {
      return this.databaseService.local.create({
        data: {
          ...createLocalDto,
          localType: {
            connect: {
              id: createLocalDto.localtypeId,
            },
          },
          localInformation: {
            create: createLocalDto.localInformation,
          },
          gates: {
            createMany: {
              data: createLocalDto.gates,
            },
          },
        },
      });
    } catch (e: DOMException) {}
  }

  async findAll(): Promise<Local[]> {
    return this.databaseService.local.findMany({
      include: this.localIncludePropertie,
    });
  }

  async findOne(id: number): Promise<Local> {
    return this.databaseService.local.findUnique({
      where: {
        id,
      },
      include: this.localIncludePropertie,
    });
  }

  async update(
    id: number,
    updateLocalDto: Prisma.LocalUpdateInput,
  ): Promise<Local> {
    return this.databaseService.local.update({
      where: {
        id,
      },
      data: updateLocalDto,
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

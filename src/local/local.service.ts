import { Injectable } from '@nestjs/common';
import { Local } from '@prisma/client';
import { DatabaseService } from 'src/database/database.service';
import { UpsertLocalDto } from './dto/upsert-local.dto';

@Injectable()
export class LocalService {
  constructor(private readonly databaseService: DatabaseService) {}

  async create(createLocalDto: UpsertLocalDto): Promise<Local> {
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
  }

  async findAll(): Promise<Local[]> {
    return this.databaseService.local.findMany({
      include: {
        localType: {
          select: {
            name: true,
          },
        },
        localInformation: {
          select: {
            zipCode: true,
            state: true,
            city: true,
            address: true,
            complement: true,
          },
        },
        gates: {
          select: {
            name: true,
            isTicketGate: true,
          },
        },
      },
    });
  }

  async findOne(id: number): Promise<Local> {
    return this.databaseService.local.findUnique({
      where: {
        id,
      },
      include: {
        localType: {
          select: {
            name: true,
          },
        },
        localInformation: {
          select: {
            zipCode: true,
            state: true,
            city: true,
            address: true,
            complement: true,
          },
        },
        gates: {
          select: {
            name: true,
            isTicketGate: true,
          },
        },
      },
    });
  }

  async update(id: number, updateLocalDto: UpsertLocalDto): Promise<Local> {
    //TODO: check validation of update
    return this.databaseService.local.update({
      where: {
        id,
      },
      data: {
        ...updateLocalDto,
        localType: {
          connect: {
            id: updateLocalDto.localtypeId,
          },
        },
        localInformation: {
          create: updateLocalDto.localInformation,
        },
        gates: {
          createMany: {
            data: updateLocalDto.gates,
          },
        },
      },
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

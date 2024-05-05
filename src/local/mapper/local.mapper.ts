import { Prisma } from '@prisma/client';
import { LocalDto } from '../dto/local.dto';

export class LocalMapper {
  async createDtoToModel(
    createLocalDto: LocalDto,
  ): Promise<Prisma.LocalCreateInput> {
    return {
      name: createLocalDto.name,
      nickname: createLocalDto.nickname,
      ein: createLocalDto.ein,
      email: createLocalDto.email,
      phone: createLocalDto.phone,
      localType: {
        connect: {
          id: createLocalDto.localTypeId,
        },
      },
      localInformation: {
        create: createLocalDto.localInformation,
      },
      gates: { createMany: { data: createLocalDto.gates } },
    };
  }

  async updateDtoToModel(
    updateLocalDto: LocalDto,
  ): Promise<Prisma.LocalUpdateInput> {
    return {
      name: updateLocalDto.name,
      nickname: updateLocalDto.nickname,
      ein: updateLocalDto.ein,
      email: updateLocalDto.email,
      phone: updateLocalDto.phone,
      localType: { connect: { id: updateLocalDto.localTypeId } },
      localInformation: { update: updateLocalDto.localInformation },
      gates: { createMany: { data: updateLocalDto.gates } },
    };
  }
}

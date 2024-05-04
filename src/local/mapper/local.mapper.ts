import { Prisma } from '@prisma/client';
import { LocalDto } from '../dto/local.dto';

export class LocalMapper {
  async createDtoToModel(
    createLocalDto: LocalDto,
  ): Promise<Prisma.LocalCreateInput> {
    const prismaLocalCreateInput: Prisma.LocalCreateInput = {
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
    return prismaLocalCreateInput;
  }

  async updateDtoToModel(
    updateLocalDto: LocalDto,
  ): Promise<Prisma.LocalUpdateInput> {
    const prismaLocalUpdateInput: Prisma.LocalUpdateInput = {
      name: updateLocalDto.name,
      nickname: updateLocalDto.nickname,
      ein: updateLocalDto.ein,
      email: updateLocalDto.email,
      phone: updateLocalDto.phone,
      localType: { connect: { id: updateLocalDto.localTypeId } },
      localInformation: { update: updateLocalDto.localInformation },
      gates: { createMany: { data: updateLocalDto.gates } },
    };
    return prismaLocalUpdateInput;
  }
}

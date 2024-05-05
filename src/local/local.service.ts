import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Local, Prisma } from '@prisma/client';
import { DatabaseService } from 'src/database/database.service';
import { LocalDto } from './dto/local.dto';
import { LocalMapper } from './mapper/local.mapper';

@Injectable()
export class LocalService {
  constructor(private readonly databaseService: DatabaseService) {}

  async create(createLocalDto: LocalDto): Promise<Local> {
    await this.validateLocalUpsert(createLocalDto);
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
    await this.validateExistingLocal(id);
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
    await this.validateExistingLocal(localId);
    await this.validateLocalUpsert(updateLocalDto);
    const mapper = new LocalMapper();
    const update: Prisma.LocalUpdateInput =
      await mapper.updateDtoToModel(updateLocalDto);
    await this.databaseService.gate.deleteMany({ where: { localId } });
    return this.databaseService.local.update({
      where: {
        id: localId,
      },
      data: update,
    });
  }

  async remove(id: number): Promise<Local> {
    await this.validateExistingLocal(id);
    return this.databaseService.local.delete({
      where: {
        id,
      },
    });
  }

  private async validateLocalUpsert(dto: LocalDto): Promise<void> {
    const localType = await this.databaseService.localType.findUnique({
      where: { id: dto.localTypeId },
    });
    if (!localType)
      throw new NotFoundException('Tipo de local não encontrado!');

    const localWithName = await this.databaseService.local.findUnique({
      where: {
        name: dto.name,
      },
    });
    if (localWithName)
      throw new BadRequestException('Nome de local já cadastrado!');

    const localWithEin = await this.databaseService.local.findUnique({
      where: {
        ein: dto.ein,
      },
    });
    if (localWithEin)
      throw new BadRequestException('CNPJ do local já cadastrado!');

    const localInformation =
      await this.databaseService.localInformation.findFirst({
        where: {
          zipCode: dto.localInformation.zipCode,
          city: dto.localInformation.city,
          state: dto.localInformation.state,
          address: dto.localInformation.address,
          complement: dto.localInformation.complement,
        },
      });
    if (localInformation)
      throw new BadRequestException('Endereço já cadastrado!');
  }

  private async validateExistingLocal(id: number): Promise<void> {
    const existingLocal = await this.databaseService.local.findUnique({
      where: { id },
    });
    if (!existingLocal) throw new NotFoundException('Local não encontrado!');
  }
}

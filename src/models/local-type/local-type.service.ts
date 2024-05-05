import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { LocalType } from '@prisma/client';
import { DatabaseService } from 'src/database/database.service';
import { LocalTypeDto } from './dto/local-type.dto';

@Injectable()
export class LocalTypeService {
  constructor(private readonly databaseService: DatabaseService) {}

  async create(createLocalTypeDto: LocalTypeDto): Promise<LocalType> {
    await this.validateLocalTypeUpsert(createLocalTypeDto);
    return this.databaseService.localType.create({ data: createLocalTypeDto });
  }

  async findAll(): Promise<LocalType[]> {
    return this.databaseService.localType.findMany();
  }

  async findOne(id: number): Promise<LocalType> {
    await this.validateExistingLocalType(id);
    return this.databaseService.localType.findUnique({ where: { id } });
  }

  async update(
    id: number,
    updateLocalTypeDto: LocalTypeDto,
  ): Promise<LocalType> {
    await this.validateLocalTypeUpsert(updateLocalTypeDto);
    await this.validateExistingLocalType(id);
    return this.databaseService.localType.update({
      where: {
        id,
      },
      data: updateLocalTypeDto,
    });
  }

  async remove(id: number): Promise<LocalType> {
    await this.validateExistingLocalType(id);
    await this.validateLocalTypeReferences(id);
    return this.databaseService.localType.delete({
      where: {
        id,
      },
    });
  }

  private async validateLocalTypeUpsert(dto: LocalTypeDto): Promise<void> {
    const localType = await this.databaseService.localType.findUnique({
      where: { name: dto.name },
    });
    if (localType)
      throw new BadRequestException('Já existe um tipo de local com esse nome');
  }

  private async validateExistingLocalType(id: number): Promise<void> {
    const existingLocalType = await this.databaseService.localType.findUnique({
      where: {
        id,
      },
    });
    if (!existingLocalType)
      throw new NotFoundException('Tipo de local não cadastrado');
  }

  private async validateLocalTypeReferences(id: number): Promise<void> {
    const localsWithThisType = await this.databaseService.local.findMany({
      where: { localTypeId: id },
    });
    if (localsWithThisType.length > 0)
      throw new UnprocessableEntityException(
        'Esse tipo está associado a locais registrados.',
      );
  }
}

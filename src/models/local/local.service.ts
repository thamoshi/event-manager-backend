import {
  BadRequestException,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { Local, Prisma } from '@prisma/client';
import { DatabaseService } from 'src/database/database.service';
import { LocalDto } from './dto/local.dto';
import { LocalMapper } from './mapper/local.mapper';
import { PaginatedResult } from 'src/utils/pagination/paginated-result.interface';

@Injectable()
export class LocalService {
  private readonly logger = new Logger(LocalService.name);

  constructor(private readonly databaseService: DatabaseService) {}

  async create(createLocalDto: LocalDto): Promise<Local> {
    try {
      await this.validateLocalUpsert(createLocalDto);
      const mapper = new LocalMapper();
      const create: Prisma.LocalCreateInput =
        await mapper.createDtoToModel(createLocalDto);
      return this.databaseService.local.create({
        data: create,
      });
    } catch (error) {
      this.logger.error(error);
      throw error;
    }
  }

  async findAll({
    page,
    perPage = 5,
    nameFilter,
  }: {
    page: number;
    perPage: number;
    nameFilter?: string;
  }): Promise<PaginatedResult<Local>> {
    try {
      const totalLocals = await this.databaseService.local.count({
        ...(nameFilter ? { where: { name: { contains: nameFilter } } } : {}),
      });
      const totalPages = Math.ceil(totalLocals / perPage);
      if (page > totalPages)
        throw new BadRequestException('Número de páginas excedido!');

      const prev = page > 1 ? page - 1 : null;
      const next = page < totalPages ? page + 1 : null;

      const locals = await this.databaseService.local.findMany({
        take: +perPage,
        skip: (page - 1) * perPage,
        ...(nameFilter ? { where: { name: { contains: nameFilter } } } : {}),
        include: {
          localType: true,
          localInformation: true,
          gates: true,
        },
      });

      return {
        data: locals,
        perPage: +perPage,
        totalPages,
        currentPage: +page,
        prev,
        next,
      };
    } catch (error) {
      this.logger.error(error);
      throw error;
    }
  }

  async findOne(id: number): Promise<Local> {
    try {
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
    } catch (error) {
      this.logger.error(error);
      throw error;
    }
  }

  async update(localId: number, updateLocalDto: LocalDto): Promise<Local> {
    try {
      await this.validateExistingLocal(localId);
      await this.validateLocalUpsert(updateLocalDto, localId);
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
    } catch (error) {
      this.logger.error(error);
      throw error;
    }
  }

  async remove(id: number): Promise<Local> {
    try {
      await this.validateExistingLocal(id);
      return this.databaseService.local.delete({
        where: {
          id,
        },
      });
    } catch (error) {
      this.logger.error(error);
      throw error;
    }
  }

  private async validateLocalUpsert(dto: LocalDto, id?: number): Promise<void> {
    const localType = await this.databaseService.localType.findUnique({
      where: { id: dto.localTypeId },
    });
    if (!localType)
      throw new NotFoundException('Tipo de local não encontrado!');

    const localWithName = await this.databaseService.local.findUnique({
      where: {
        ...(id ? { NOT: { id } } : {}),
        name: dto.name,
      },
    });
    if (localWithName)
      throw new BadRequestException('Nome de local já cadastrado!');

    const localWithEin = await this.databaseService.local.findUnique({
      where: {
        ...(id ? { NOT: { id } } : {}),
        ein: dto.ein,
      },
    });
    if (localWithEin)
      throw new BadRequestException('CNPJ do local já cadastrado!');

    const localInformation =
      await this.databaseService.localInformation.findFirst({
        where: {
          ...(id ? { NOT: { localId: id } } : {}),
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

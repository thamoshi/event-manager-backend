import {
  BadRequestException,
  Injectable,
  Logger,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { EventType } from '@prisma/client';
import { DatabaseService } from 'src/database/database.service';
import { EventTypeDto } from './dto/event-type.dto';

@Injectable()
export class EventTypeService {
  private readonly logger = new Logger(EventTypeService.name);

  constructor(private readonly databaseService: DatabaseService) {}

  async create(createEventTypeDto: EventTypeDto): Promise<EventType> {
    try {
      await this.validateEventTypeUpsert(createEventTypeDto);
      return this.databaseService.eventType.create({
        data: createEventTypeDto,
      });
    } catch (error) {
      this.logger.error(error);
      throw error;
    }
  }

  async findAll(): Promise<EventType[]> {
    try {
      return this.databaseService.eventType.findMany();
    } catch (error) {
      this.logger.error(error);
      throw error;
    }
  }

  async findOne(id: number): Promise<EventType> {
    try {
      await this.validateExistingEventType(id);
      return this.databaseService.eventType.findUnique({ where: { id } });
    } catch (error) {
      this.logger.error(error);
      throw error;
    }
  }

  async update(
    id: number,
    updateEventTypeDto: EventTypeDto,
  ): Promise<EventType> {
    try {
      await this.validateExistingEventType(id);
      await this.validateEventTypeUpsert(updateEventTypeDto, id);
      return this.databaseService.eventType.update({
        where: { id },
        data: updateEventTypeDto,
      });
    } catch (error) {
      this.logger.error(error);
      throw error;
    }
  }

  async remove(id: number): Promise<EventType> {
    try {
      await this.validateExistingEventType(id);
      await this.validateEventTypeReferences(id);
      return this.databaseService.eventType.delete({ where: { id } });
    } catch (error) {
      this.logger.error(error);
      throw error;
    }
  }

  private async validateEventTypeUpsert(
    dto: EventTypeDto,
    id?: number,
  ): Promise<void> {
    const eventType = await this.databaseService.eventType.findUnique({
      where: {
        ...(id ? { NOT: { id } } : {}),
        name: dto.name,
      },
    });
    if (eventType)
      throw new BadRequestException(
        'Já existe um tipo de evento com esse nome',
      );
  }

  private async validateExistingEventType(id: number): Promise<void> {
    const existingEventType = await this.databaseService.eventType.findUnique({
      where: {
        id,
      },
    });
    if (!existingEventType)
      throw new NotFoundException('Tipo de evento não cadastrado');
  }

  private async validateEventTypeReferences(id: number): Promise<void> {
    const eventsWithThisType = await this.databaseService.event.findMany({
      where: { eventTypeId: id },
    });
    if (eventsWithThisType.length > 0)
      throw new UnprocessableEntityException(
        'Esse tipo está associado a eventos registrados.',
      );
  }
}

import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { EventType } from '@prisma/client';
import { DatabaseService } from 'src/database/database.service';
import { EventTypeDto } from './dto/event-type.dto';

@Injectable()
export class EventTypeService {
  constructor(private readonly databaseService: DatabaseService) {}

  async create(createEventTypeDto: EventTypeDto): Promise<EventType> {
    await this.validateEventTypeUpsert(createEventTypeDto);
    return this.databaseService.eventType.create({
      data: createEventTypeDto,
    });
  }

  async findAll(): Promise<EventType[]> {
    return this.databaseService.eventType.findMany();
  }

  async findOne(id: number): Promise<EventType> {
    await this.validateExistingEventType(id);
    return this.databaseService.eventType.findUnique({ where: { id } });
  }

  async update(
    id: number,
    updateEventTypeDto: EventTypeDto,
  ): Promise<EventType> {
    await this.validateExistingEventType(id);
    await this.validateEventTypeUpsert(updateEventTypeDto);
    return this.databaseService.eventType.update({
      where: { id },
      data: updateEventTypeDto,
    });
  }

  async remove(id: number): Promise<EventType> {
    await this.validateExistingEventType(id);
    await this.validateEventTypeReferences(id);
    return this.databaseService.eventType.delete({ where: { id } });
  }

  private async validateEventTypeUpsert(dto: EventTypeDto): Promise<void> {
    const eventType = await this.databaseService.eventType.findUnique({
      where: { name: dto.name },
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

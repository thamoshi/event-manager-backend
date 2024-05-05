import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { EventDto } from './dto/event.dto';
import { DatabaseService } from 'src/database/database.service';
import { Event, Prisma } from '@prisma/client';
import { EventMapper } from './mapper/event.mapper';

@Injectable()
export class EventService {
  constructor(private readonly databaseService: DatabaseService) {}

  async create(createEventDto: EventDto): Promise<Event> {
    await this.validateEventUpsert(createEventDto);
    const mapper = new EventMapper();
    const create: Prisma.EventCreateInput =
      await mapper.createDtoToModel(createEventDto);
    return this.databaseService.event.create({
      data: create,
    });
  }

  async findAll(): Promise<Event[]> {
    return this.databaseService.event.findMany({
      include: {
        eventType: true,
        local: true,
      },
    });
  }

  async findOne(id: number): Promise<Event> {
    await this.validateExistingEvent(id);
    return this.databaseService.event.findUnique({
      where: { id },
      include: {
        eventType: true,
        local: true,
      },
    });
  }

  async update(eventId: number, updateEventDto: EventDto): Promise<Event> {
    await this.validateExistingEvent(eventId);
    await this.validateEventUpsert(updateEventDto);
    const mapper = new EventMapper();
    const update: Prisma.EventUpdateInput =
      await mapper.updateDtoToModel(updateEventDto);
    return this.databaseService.event.update({
      where: { id: eventId },
      data: update,
    });
  }

  async remove(id: number): Promise<Event> {
    await this.validateExistingEvent(id);
    return this.databaseService.event.delete({
      where: { id },
    });
  }

  private async validateEventUpsert(dto: EventDto): Promise<void> {
    const eventType = await this.databaseService.eventType.findUnique({
      where: { id: dto.eventTypeId },
    });
    if (!eventType)
      throw new NotFoundException('Tipo de evento não encontrado!');

    const eventWithName = await this.databaseService.event.findFirst({
      where: {
        eventDate: dto.eventDate,
        eventTime: dto.eventTime,
        localId: dto.localId,
      },
    });
    if (eventWithName)
      throw new BadRequestException(
        'Já existe um evento na mesma data e mesmo local!',
      );
  }

  private async validateExistingEvent(id: number): Promise<void> {
    const existingEvent = await this.databaseService.event.findUnique({
      where: { id },
    });
    if (!existingEvent) throw new NotFoundException('Evento não encontrado!');
  }
}

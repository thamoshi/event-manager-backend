import {
  BadRequestException,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { EventDto } from './dto/event.dto';
import { DatabaseService } from 'src/database/database.service';
import { Event, Prisma } from '@prisma/client';
import { EventMapper } from './mapper/event.mapper';

@Injectable()
export class EventService {
  private readonly logger = new Logger(EventService.name);
  private readonly mapper = new EventMapper();

  constructor(private readonly databaseService: DatabaseService) {}

  async create(createEventDto: EventDto): Promise<Event> {
    try {
      await this.validateEventUpsert(createEventDto);
      const create: Prisma.EventCreateInput =
        await this.mapper.createDtoToModel(createEventDto);
      return this.databaseService.event.create({
        data: create,
      });
    } catch (error) {
      this.logger.error(error);
      throw error;
    }
  }

  async findAll(): Promise<Event[]> {
    try {
      return this.databaseService.event.findMany({
        include: {
          eventType: true,
          local: true,
        },
      });
    } catch (error) {
      this.logger.error(error);
      throw error;
    }
  }

  async findOne(id: number): Promise<Event> {
    try {
      await this.validateExistingEvent(id);
      return this.databaseService.event.findUnique({
        where: { id },
        include: {
          eventType: true,
          local: true,
        },
      });
    } catch (error) {
      this.logger.error(error);
      throw error;
    }
  }

  async update(eventId: number, updateEventDto: EventDto): Promise<Event> {
    try {
      await this.validateExistingEvent(eventId);
      await this.validateEventUpsert(updateEventDto);
      const update: Prisma.EventUpdateInput =
        await this.mapper.updateDtoToModel(updateEventDto);
      return this.databaseService.event.update({
        where: { id: eventId },
        data: update,
      });
    } catch (error) {
      this.logger.error(error);
      throw error;
    }
  }

  async remove(id: number): Promise<Event> {
    try {
      await this.validateExistingEvent(id);
      return this.databaseService.event.delete({
        where: { id },
      });
    } catch (error) {
      this.logger.error(error);
      throw error;
    }
  }

  private async validateEventUpsert(dto: EventDto, id?: number): Promise<void> {
    const eventType = await this.databaseService.eventType.findUnique({
      where: { id: dto.eventTypeId },
    });
    if (!eventType)
      throw new NotFoundException('Tipo de evento não encontrado!');

    const eventWithInfo = await this.databaseService.event.findFirst({
      where: {
        ...(id ? { NOT: { id } } : {}),
        eventDate: new Date(dto.eventDate),
        eventTime: dto.eventTime,
        localId: dto.localId,
      },
    });
    if (eventWithInfo)
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

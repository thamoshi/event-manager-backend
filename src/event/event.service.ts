import { Injectable } from '@nestjs/common';
import { EventDto } from './dto/event.dto';
import { DatabaseService } from 'src/database/database.service';
import { Event, Prisma } from '@prisma/client';
import { EventMapper } from './mapper/event.mapper';

@Injectable()
export class EventService {
  constructor(private readonly databaseService: DatabaseService) {}

  async create(createEventDto: EventDto): Promise<Event> {
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
    return this.databaseService.event.findUnique({
      where: { id },
      include: {
        eventType: true,
        local: true,
      },
    });
  }

  async update(eventId: number, updateEventDto: EventDto): Promise<Event> {
    const mapper = new EventMapper();
    const update: Prisma.EventUpdateInput =
      await mapper.updateDtoToModel(updateEventDto);
    return this.databaseService.event.update({
      where: { id: eventId },
      data: update,
    });
  }

  async remove(id: number): Promise<Event> {
    return this.databaseService.event.delete({
      where: { id },
    });
  }
}

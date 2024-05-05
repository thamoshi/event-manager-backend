import { Injectable } from '@nestjs/common';
import { EventType, Prisma } from '@prisma/client';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class EventTypeService {
  constructor(private readonly databaseService: DatabaseService) {}

  async create(
    createEventTypeDto: Prisma.EventTypeCreateInput,
  ): Promise<EventType> {
    return this.databaseService.eventType.create({
      data: createEventTypeDto,
    });
  }

  async findAll(): Promise<EventType[]> {
    return this.databaseService.eventType.findMany();
  }

  async findOne(id: number): Promise<EventType> {
    return this.databaseService.eventType.findUnique({ where: { id } });
  }

  async update(
    id: number,
    updateEventTypeDto: Prisma.EventTypeUpdateInput,
  ): Promise<EventType> {
    return this.databaseService.eventType.update({
      where: { id },
      data: updateEventTypeDto,
    });
  }

  async remove(id: number): Promise<EventType> {
    return this.databaseService.eventType.delete({ where: { id } });
  }
}

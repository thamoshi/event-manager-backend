import { Prisma } from '@prisma/client';
import { EventDto } from '../dto/event.dto';

export class EventMapper {
  async createDtoToModel(
    createEventDto: EventDto,
  ): Promise<Prisma.EventCreateInput> {
    return {
      name: createEventDto.name,
      eventDate: new Date(createEventDto.eventDate),
      eventTime: createEventDto.eventTime,
      email: createEventDto.email,
      phone: createEventDto.phone,
      eventType: { connect: { id: createEventDto.eventTypeId } },
      local: { connect: { id: createEventDto.localId } },
    };
  }

  async updateDtoToModel(
    updateEventDto: EventDto,
  ): Promise<Prisma.EventUpdateInput> {
    return {
      name: updateEventDto.name,
      eventDate: new Date(updateEventDto.eventDate),
      eventTime: updateEventDto.eventTime,
      email: updateEventDto.email,
      phone: updateEventDto.phone,
      eventType: { connect: { id: updateEventDto.eventTypeId } },
      local: { connect: { id: updateEventDto.localId } },
    };
  }
}

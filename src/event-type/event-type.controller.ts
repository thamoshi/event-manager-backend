import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UsePipes,
  ValidationPipe,
  Put,
  ParseIntPipe,
} from '@nestjs/common';
import { EventTypeService } from './event-type.service';
import { EventTypeDto } from './dto/event-type.dto';

@Controller('event-type')
export class EventTypeController {
  constructor(private readonly eventTypeService: EventTypeService) {}

  @Post()
  @UsePipes(ValidationPipe)
  create(@Body() createEventTypeDto: EventTypeDto) {
    return this.eventTypeService.create(createEventTypeDto);
  }

  @Get()
  findAll() {
    return this.eventTypeService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.eventTypeService.findOne(id);
  }

  @Put(':id')
  @UsePipes(ValidationPipe)
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateEventTypeDto: EventTypeDto,
  ) {
    return this.eventTypeService.update(id, updateEventTypeDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.eventTypeService.remove(id);
  }
}

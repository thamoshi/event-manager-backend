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
import { ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Event Types')
@Controller('event-type')
export class EventTypeController {
  constructor(private readonly eventTypeService: EventTypeService) {}

  @Post()
  @ApiResponse({
    status: 201,
    description: 'Tipo de evento criado corretamente.',
  })
  @ApiResponse({
    status: 400,
    description: 'Corpo da requisição está incorreto.',
  })
  @UsePipes(ValidationPipe)
  create(@Body() createEventTypeDto: EventTypeDto) {
    return this.eventTypeService.create(createEventTypeDto);
  }

  @Get()
  @ApiResponse({
    status: 200,
    description: 'Tipos de evento buscado com sucesso.',
  })
  findAll() {
    return this.eventTypeService.findAll();
  }

  @Get(':id')
  @ApiResponse({
    status: 200,
    description: 'Tipo de evento buscado com sucesso.',
  })
  @ApiResponse({
    status: 404,
    description: 'Tipo de evento não encontrado.',
  })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.eventTypeService.findOne(id);
  }

  @Put(':id')
  @ApiResponse({
    status: 200,
    description: 'Tipo de evento atualizado corretamente.',
  })
  @ApiResponse({
    status: 400,
    description: 'Corpo da requisição está incorreto',
  })
  @ApiResponse({
    status: 404,
    description: 'Tipo de evento não encontrado.',
  })
  @UsePipes(ValidationPipe)
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateEventTypeDto: EventTypeDto,
  ) {
    return this.eventTypeService.update(id, updateEventTypeDto);
  }

  @Delete(':id')
  @ApiResponse({
    status: 200,
    description: 'Tipo de evento deletado com sucesso.',
  })
  @ApiResponse({
    status: 404,
    description: 'Tipo de evento não encontrado.',
  })
  @ApiResponse({
    status: 422,
    description:
      'Tipo de evento está associado com eventos e não pode ser deletado.',
  })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.eventTypeService.remove(id);
  }
}

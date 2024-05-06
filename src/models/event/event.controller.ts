import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  ParseIntPipe,
  Put,
  UsePipes,
  ValidationPipe,
  Query,
} from '@nestjs/common';
import { EventService } from './event.service';
import { EventDto } from './dto/event.dto';
import { ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Events')
@Controller('event')
export class EventController {
  constructor(private readonly eventService: EventService) {}

  @Post()
  @ApiResponse({
    status: 201,
    description: 'Evento criado corretamente.',
  })
  @ApiResponse({
    status: 400,
    description: 'Corpo da requisição está incorreto',
  })
  @UsePipes(ValidationPipe)
  create(@Body() createEventDto: EventDto) {
    return this.eventService.create(createEventDto);
  }

  @Get()
  @ApiQuery({
    name: 'page',
    type: Int16Array,
    description: 'Número da página',
    required: true,
  })
  @ApiQuery({
    name: 'perPage',
    type: Int16Array,
    description: 'Quantidade de itens por página. Por padrão, perPage = 5',
    required: false,
  })
  @ApiQuery({
    name: 'name',
    type: String,
    description: 'Nome a ser buscado',
    required: false,
  })
  @ApiResponse({
    status: 200,
    description: 'Lista de eventos buscada com sucesso.',
  })
  findAll(
    @Query('page', ParseIntPipe) page: number,
    @Query('perPage') perPage?: number,
    @Query('name') name?: string,
  ) {
    return this.eventService.findAll({ page, perPage, nameFilter: name });
  }

  @Get(':id')
  @ApiResponse({
    status: 200,
    description: 'Evento buscado com sucesso.',
  })
  @ApiResponse({
    status: 404,
    description: 'Evento não encontrado.',
  })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.eventService.findOne(+id);
  }

  @Put(':id')
  @ApiResponse({
    status: 200,
    description: 'Evento atualizado corretamente.',
  })
  @ApiResponse({
    status: 400,
    description: 'Corpo da requisição está incorreto',
  })
  @ApiResponse({
    status: 404,
    description: 'Evento não encontrado.',
  })
  @UsePipes(ValidationPipe)
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateEventDto: EventDto,
  ) {
    return this.eventService.update(id, updateEventDto);
  }

  @Delete(':id')
  @ApiResponse({
    status: 200,
    description: 'Evento deletado com sucesso.',
  })
  @ApiResponse({
    status: 404,
    description: 'Evento não encontrado.',
  })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.eventService.remove(id);
  }
}

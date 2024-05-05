import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  ParseIntPipe,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { LocalTypeService } from './local-type.service';
import { LocalTypeDto } from './dto/local-type.dto';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Local Types')
@Controller('local-type')
export class LocalTypeController {
  constructor(private readonly localTypeService: LocalTypeService) {}

  @Post()
  @ApiResponse({
    status: 201,
    description: 'Tipo de local criado corretamente.',
  })
  @ApiResponse({
    status: 400,
    description: 'Corpo da requisição está incorreto.',
  })
  @UsePipes(ValidationPipe)
  create(@Body() createLocalTypeDto: LocalTypeDto) {
    return this.localTypeService.create(createLocalTypeDto);
  }

  @Get()
  @ApiResponse({
    status: 200,
    description: 'Tipos de locais buscado com sucesso.',
  })
  findAll() {
    return this.localTypeService.findAll();
  }

  @Get(':id')
  @ApiResponse({
    status: 200,
    description: 'Tipo de local buscado com sucesso.',
  })
  @ApiResponse({
    status: 404,
    description: 'Tipo de local não encontrado.',
  })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.localTypeService.findOne(id);
  }

  @Put(':id')
  @ApiResponse({
    status: 200,
    description: 'Tipo de local atualizado corretamente.',
  })
  @ApiResponse({
    status: 400,
    description: 'Corpo da requisição está incorreto',
  })
  @ApiResponse({
    status: 404,
    description: 'Tipo de local não encontrado.',
  })
  @UsePipes(ValidationPipe)
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateLocalTypeDto: LocalTypeDto,
  ) {
    return this.localTypeService.update(id, updateLocalTypeDto);
  }

  @Delete(':id')
  @ApiResponse({
    status: 200,
    description: 'Tipo de local deletado com sucesso.',
  })
  @ApiResponse({
    status: 404,
    description: 'Tipo de local não encontrado.',
  })
  @ApiResponse({
    status: 422,
    description:
      'Tipo de local está associado com locais e não pode ser deletado.',
  })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.localTypeService.remove(id);
  }
}

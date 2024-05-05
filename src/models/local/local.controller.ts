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
import { LocalService } from './local.service';
import { Local } from '@prisma/client';
import { LocalDto } from './dto/local.dto';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Locals')
@Controller('local')
export class LocalController {
  constructor(private readonly localService: LocalService) {}

  @Post()
  @ApiResponse({
    status: 201,
    description: 'Local criado corretamente.',
  })
  @ApiResponse({
    status: 400,
    description: 'Corpo da requisição está incorreto',
  })
  @UsePipes(ValidationPipe)
  create(@Body() createLocalDto: LocalDto): Promise<Local> {
    return this.localService.create(createLocalDto);
  }

  @Get()
  @ApiResponse({
    status: 200,
    description: 'Lista de locais buscada com sucesso.',
  })
  findAll() {
    return this.localService.findAll();
  }

  @Get(':id')
  @ApiResponse({
    status: 200,
    description: 'Local buscado com sucesso.',
  })
  @ApiResponse({
    status: 404,
    description: 'Local não encontrado.',
  })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.localService.findOne(id);
  }

  @Put(':id')
  @ApiResponse({
    status: 200,
    description: 'Local atualizado corretamente.',
  })
  @ApiResponse({
    status: 400,
    description: 'Corpo da requisição está incorreto',
  })
  @ApiResponse({
    status: 404,
    description: 'Local não encontrado.',
  })
  @UsePipes(ValidationPipe)
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateLocalDto: LocalDto,
  ) {
    return this.localService.update(id, updateLocalDto);
  }

  @Delete(':id')
  @ApiResponse({
    status: 200,
    description: 'Local deletado com sucesso.',
  })
  @ApiResponse({
    status: 404,
    description: 'Local não encontrado.',
  })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.localService.remove(id);
  }
}

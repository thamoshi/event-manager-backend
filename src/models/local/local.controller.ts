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
  Query,
} from '@nestjs/common';
import { LocalService } from './local.service';
import { Local } from '@prisma/client';
import { LocalDto } from './dto/local.dto';
import { ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';

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
    description: 'Lista de locais buscada com sucesso.',
  })
  findAll(
    @Query('page', ParseIntPipe) page: number,
    @Query('perPage') perPage?: number,
    @Query('name') name?: string,
  ) {
    return this.localService.findAll({ page, perPage, nameFilter: name });
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

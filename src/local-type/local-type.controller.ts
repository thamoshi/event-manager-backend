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

@Controller('local-type')
export class LocalTypeController {
  constructor(private readonly localTypeService: LocalTypeService) {}

  @Post()
  @UsePipes(ValidationPipe)
  create(@Body() createLocalTypeDto: LocalTypeDto) {
    return this.localTypeService.create(createLocalTypeDto);
  }

  @Get()
  findAll() {
    return this.localTypeService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.localTypeService.findOne(id);
  }

  @Put(':id')
  @UsePipes(ValidationPipe)
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateLocalTypeDto: LocalTypeDto,
  ) {
    return this.localTypeService.update(id, updateLocalTypeDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.localTypeService.remove(id);
  }
}

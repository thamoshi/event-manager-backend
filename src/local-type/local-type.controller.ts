import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { LocalTypeService } from './local-type.service';
import { Prisma } from '@prisma/client';

@Controller('local-type')
export class LocalTypeController {
  constructor(private readonly localTypeService: LocalTypeService) {}

  @Post()
  create(@Body() createLocalTypeDto: Prisma.LocalTypeCreateInput) {
    return this.localTypeService.create(createLocalTypeDto);
  }

  @Get()
  findAll() {
    return this.localTypeService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.localTypeService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateLocalTypeDto: Prisma.LocalTypeUpdateInput,
  ) {
    return this.localTypeService.update(+id, updateLocalTypeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.localTypeService.remove(+id);
  }
}

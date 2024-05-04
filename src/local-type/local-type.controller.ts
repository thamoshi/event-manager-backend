import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
} from '@nestjs/common';
import { LocalTypeService } from './local-type.service';
import { UpsertLocalTypeDto } from './dto/upsert-local-type.dto';

@Controller('local-type')
export class LocalTypeController {
  constructor(private readonly localTypeService: LocalTypeService) {}

  @Post()
  create(@Body() createLocalTypeDto: UpsertLocalTypeDto) {
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

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() updateLocalTypeDto: UpsertLocalTypeDto,
  ) {
    return this.localTypeService.update(+id, updateLocalTypeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.localTypeService.remove(+id);
  }
}

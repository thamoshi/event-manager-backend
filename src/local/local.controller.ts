import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UsePipes,
  ValidationPipe,
  Put,
} from '@nestjs/common';
import { LocalService } from './local.service';
import { Local } from '@prisma/client';
import { UpsertLocalDto } from './dto/upsert-local.dto';

@Controller('local')
export class LocalController {
  constructor(private readonly localService: LocalService) {}

  @Post()
  @UsePipes(ValidationPipe)
  create(@Body() createLocalDto: UpsertLocalDto): Promise<Local> {
    return this.localService.create(createLocalDto);
  }

  @Get()
  findAll() {
    return this.localService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.localService.findOne(+id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateLocalDto: UpsertLocalDto) {
    return this.localService.update(+id, updateLocalDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.localService.remove(+id);
  }
}

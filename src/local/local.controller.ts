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
} from '@nestjs/common';
import { LocalService } from './local.service';
import { Local } from '@prisma/client';
import { LocalDto } from './dto/local.dto';

@Controller('local')
export class LocalController {
  constructor(private readonly localService: LocalService) {}

  @Post()
  @UsePipes(ValidationPipe)
  create(@Body() createLocalDto: LocalDto): Promise<Local> {
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
  @UsePipes(ValidationPipe)
  update(@Param('id') id: string, @Body() updateLocalDto: LocalDto) {
    return this.localService.update(+id, updateLocalDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.localService.remove(+id);
  }
}

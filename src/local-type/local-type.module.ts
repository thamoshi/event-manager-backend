import { Module } from '@nestjs/common';
import { LocalTypeService } from './local-type.service';
import { LocalTypeController } from './local-type.controller';

@Module({
  controllers: [LocalTypeController],
  providers: [LocalTypeService],
})
export class LocalTypeModule {}

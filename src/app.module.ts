import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { LocalModule } from './local/local.module';
import { LocalTypeModule } from './local-type/local-type.module';

@Module({
  imports: [DatabaseModule, LocalModule, LocalTypeModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

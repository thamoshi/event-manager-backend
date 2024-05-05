import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { LocalModule } from './models/local/local.module';
import { LocalTypeModule } from './models/local-type/local-type.module';
import { EventModule } from './models/event/event.module';
import { EventTypeModule } from './models/event-type/event-type.module';

@Module({
  imports: [
    DatabaseModule,
    LocalModule,
    LocalTypeModule,
    EventModule,
    EventTypeModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

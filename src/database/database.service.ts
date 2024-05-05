import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class DatabaseService extends PrismaClient implements OnModuleInit {
  private readonly logger = new Logger(DatabaseService.name);
  async onModuleInit() {
    await this.$connect()
      .then(() => this.logger.log('Banco de dados conectado'))
      .catch((e) => this.logger.error(e));
  }
}

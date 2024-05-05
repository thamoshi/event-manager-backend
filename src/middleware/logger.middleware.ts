import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  private logger = new Logger('HTTP');

  use(request: Request, response: Response, next: NextFunction): void {
    const startTime = Date.now();
    const { method, originalUrl } = request;

    response.on('finish', () => {
      const { statusCode } = response;
      const contentLength = response.get('content-length');
      const delay = Date.now() - startTime;
      this.logger.log(
        `${method} ${originalUrl} ${statusCode} [${contentLength}] +${delay}ms`,
      );
    });

    next();
  }
}

import { Injectable, NestMiddleware, HttpException, HttpStatus, Logger } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class RateLimitMiddleware implements NestMiddleware {
  private readonly logger = new Logger(RateLimitMiddleware.name);
  private readonly requests = new Map<
    string,
    { count: number; startTime: number }
  >();
  private readonly timeWindowMs = 60 * 1000;
  private readonly maxRequests = 20;

  use(req: Request, res: Response, next: NextFunction) {
    const ip = req.ip;

    if (!ip) {
      return next();
    }

    const currentTime = Date.now();
    const record = this.requests.get(ip);

    if (!record || currentTime - record.startTime > this.timeWindowMs) {
      this.requests.set(ip, { count: 1, startTime: currentTime });
    } else {
      record.count++;
      if (record.count > this.maxRequests) {
        const errorMessage =
          'Çok fazla istek gönderdiniz, lütfen daha sonra tekrar deneyin.';
        this.logger.warn(
          `Rate limit exceeded for IP ${ip}. (${record.count}/${this.maxRequests}) - ${errorMessage}`,
        );
        throw new HttpException(errorMessage, HttpStatus.TOO_MANY_REQUESTS);
      }
      this.requests.set(ip, record);
    }
    next();
  }
}

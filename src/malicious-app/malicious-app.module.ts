import { Module } from '@nestjs/common';
import { MaliciousAppService } from './malicious-app.service';
import { MaliciousAppController } from './malicious-app.controller';

@Module({
  providers: [MaliciousAppService],
  controllers: [MaliciousAppController]
})
export class MaliciousAppModule {}

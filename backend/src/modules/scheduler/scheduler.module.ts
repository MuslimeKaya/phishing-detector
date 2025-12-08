import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { HttpModule } from '@nestjs/axios';
import { DataFetchService } from './data-fetch/data-fetch.service';
import { DataFetchController } from './data-fetch/data-fetch.controller';
import { PhishingModule } from '../phishing/phishing.module';
import { MaliciousAppModule } from '../malicious-app/malicious-app.module';

@Module({
  imports: [
    ScheduleModule.forRoot(),
    HttpModule,
    PhishingModule,
    MaliciousAppModule,
  ],
  controllers: [DataFetchController],
  providers: [DataFetchService],
})
export class SchedulerModule { }

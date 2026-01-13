import { Module } from '@nestjs/common';
import { PhishingService } from './phishing.service';
import { PhishingController } from './phishing.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PhishingEntity } from './entites/phishing.entity';



@Module({
  imports: [
    TypeOrmModule.forFeature([PhishingEntity]),
  ],
  providers: [PhishingService],
  controllers: [PhishingController],
  exports: [PhishingService]
})
export class PhishingModule { }

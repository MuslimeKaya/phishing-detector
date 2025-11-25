import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MaliciousAppService } from './malicious-app.service';
import { MaliciousAppController } from './malicious-app.controller';
import { MaliciousAppEntity } from './entites/malicious-app.entity';

@Module({
  imports: [TypeOrmModule.forFeature([MaliciousAppEntity])],
  providers: [MaliciousAppService],
  controllers: [MaliciousAppController],
  exports: [MaliciousAppService]
})
export class MaliciousAppModule {}

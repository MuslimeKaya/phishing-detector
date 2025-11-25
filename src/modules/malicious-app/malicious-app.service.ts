import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MaliciousAppEntity } from './entites/malicious-app.entity';
import { CreateMaliciousAppDto } from './dto/create-malicious-app.dto';

@Injectable()
export class MaliciousAppService {
    constructor(
        @InjectRepository(MaliciousAppEntity)
        private readonly maliciousAppRepository: Repository<MaliciousAppEntity>,
    ) { }

    async create(createMaliciousAppDto: CreateMaliciousAppDto): Promise<MaliciousAppEntity> {
        const newApp = this.maliciousAppRepository.create(createMaliciousAppDto);
        return this.maliciousAppRepository.save(newApp);
    }

    async findAll(): Promise<MaliciousAppEntity[]> {
        return this.maliciousAppRepository.find();
    }

    async findOneBySha256(sha256: string): Promise<MaliciousAppEntity> {
        const app = await this.maliciousAppRepository.findOne({ where: { sha256 } });
        if (!app) {
            throw new NotFoundException(`'${sha256}' SHA256 karmasına sahip kötü amaçlı uygulama bulunamadı.`);
        }
        return app;
    }

    async exists(sha256: string): Promise<boolean> {
        const count = await this.maliciousAppRepository.count({ where: { sha256 } });
        return count > 0;
    }
}

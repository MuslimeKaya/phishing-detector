import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
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

    async create(createDto: CreateMaliciousAppDto): Promise<MaliciousAppEntity> {
        try {
            const newApp = this.maliciousAppRepository.create(createDto);
            return await this.maliciousAppRepository.save(newApp);
        } catch (error) {
            if (error.code === '23505') {
                throw new ConflictException(`SHA256 '${createDto
                    .sha256
                    }' already exists.`);
            }
            throw error;
        }
    }

    async findAll(): Promise<MaliciousAppEntity[]> {
        return this.maliciousAppRepository.find({
            order: { createdAt: 'DESC' }
        });
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

    async update(id: string, updateDto: Partial<{ sha256: string; packageName?: string; threatType: string }>): Promise<MaliciousAppEntity> {
        const app = await this.maliciousAppRepository.findOne({ where: { id } });
        if (!app) {
            throw new NotFoundException(`ID '${id}' ile uygulama bulunamadı.`);
        }
        Object.assign(app, updateDto);
        return await this.maliciousAppRepository.save(app);
    }

    async delete(id: string): Promise<void> {
        const result = await this.maliciousAppRepository.delete(id);
        if (result.affected === 0) {
            throw new NotFoundException(`ID '${id}' ile uygulama bulunamadı.`);
        }
    }
}
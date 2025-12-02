import { Injectable, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PhishingEntity } from './entites/phishing.entity';
import { CreatePhishingDto } from './dto/create-phishing.dto';

@Injectable()
export class PhishingService {
  constructor(
    @InjectRepository(PhishingEntity)
    private readonly phishingRepository: Repository<PhishingEntity>,
  ) {}

  async create(createPhishingDto: CreatePhishingDto): Promise<PhishingEntity> {
    const newPhishingEntry = this.phishingRepository.create(createPhishingDto);

    try {
      return await this.phishingRepository.save(newPhishingEntry);
    } catch (error) {
      // Check for unique constraint violation (error code '23505' in PostgreSQL)
      if (error.code === '23505') {
        throw new ConflictException(`URL '${createPhishingDto.url}' already exists.`);
      }
      throw error;
    }
  }

  findAll(): Promise<PhishingEntity[]> {
    return this.phishingRepository.find();
  }

  findOne(id: string): Promise<PhishingEntity | null> {
    return this.phishingRepository.findOneBy({ id });
  }

  findByUrl(url: string): Promise<PhishingEntity | null> {
    return this.phishingRepository.findOneBy({ url });
  }
}


import { Injectable, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ILike, Repository } from 'typeorm';
import { PhishingEntity } from './entites/phishing.entity';
import { CreatePhishingDto } from './dto/create-phishing.dto';

@Injectable()
export class PhishingService {
  constructor(
    @InjectRepository(PhishingEntity)
    private readonly phishingRepository: Repository<PhishingEntity>,
  ) { }

  async create(createPhishingDto: CreatePhishingDto): Promise<PhishingEntity> {
    const newPhishingEntry = this.phishingRepository.create(createPhishingDto);

    try {

      const maxIdResult = await this.phishingRepository
        .createQueryBuilder('phishing')
        .select('MAX(phishing.id)', 'max')
        .getRawOne();

      const nextId = (maxIdResult && maxIdResult.max) ? parseInt(maxIdResult.max, 10) + 1 : 10000000;
      newPhishingEntry.id = nextId;
      newPhishingEntry.submissionTime = new Date().toISOString();
      newPhishingEntry.verificationTime = new Date().toISOString();
      newPhishingEntry.online = 'yes';
      newPhishingEntry.verified = 'yes';

      return await this.phishingRepository.save(newPhishingEntry);
    } catch (error: any) {
      if (error.code === '23505') {
        throw new ConflictException(`URL '${createPhishingDto.url}' already exists.`);
      }
      throw error;
    }
  }

  async findAll(options: {
    page: number;
    limit: number;
    search?: string;
  }): Promise<{ data: PhishingEntity[]; total: number }> {
    const { page = 1, limit = 10, search = '' } = options;
    const skip: number = (page - 1) * limit;

    const whereConditions = search
      ? [
        { url: ILike(`%${search}%`) },
        { target: ILike(`%${search}%`) },
      ]
      : [];

    console.log('Fetching phishing data with options:', options);
    console.log('Query conditions:', JSON.stringify(whereConditions));

    try {

      try {
        const rawCount = await this.phishingRepository.query('SELECT count(*) FROM verified_online');
        console.log('RAW SQL COUNT CHECK:', rawCount);
      } catch (err) {
        console.error('RAW SQL ERROR:', err);
      }

      const [data, total] = await this.phishingRepository.findAndCount({
        where: whereConditions.length > 0 ? whereConditions : undefined,
        skip,
        take: limit,
        order: {
          submissionTime: 'DESC',
        },
      });
      console.log(`Found ${total} records.`);
      return { data, total };
    } catch (error) {
      console.error('Error in findAll:', error);
      throw error;
    }
  }

  findOne(id: number): Promise<PhishingEntity | null> {
    return this.phishingRepository.findOneBy({ id });
  }

  findByUrl(url: string): Promise<PhishingEntity | null> {
    return this.phishingRepository.findOneBy({ url });
  }

  async delete(id: number): Promise<void> {
    await this.phishingRepository.delete(id);
  }
}

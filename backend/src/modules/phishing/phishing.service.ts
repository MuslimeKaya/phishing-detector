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
      return await this.phishingRepository.save(newPhishingEntry);
    } catch (error) {
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
        { source: ILike(`%${search}%`) },
        { target: ILike(`%${search}%`) },
      ]
      : [];

    const [data, total] = await this.phishingRepository.findAndCount({
      where: whereConditions.length > 0 ? whereConditions : undefined,
      skip,
      take: limit,
      order: {
        createdAt: 'DESC',
      },
    });

    return { data, total };
  }

  findOne(id: string): Promise<PhishingEntity | null> {
    return this.phishingRepository.findOneBy({ id });
  }

  findByUrl(url: string): Promise<PhishingEntity | null> {
    return this.phishingRepository.findOneBy({ url });
  }
}

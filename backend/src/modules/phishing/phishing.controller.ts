import {
    Controller,
    Get,
    Post,
    Body,
    Param,
    NotFoundException,
    ParseUUIDPipe,
} from '@nestjs/common';
import { PhishingService } from './phishing.service';
import { CreatePhishingDto } from './dto/create-phishing.dto';
import { PhishingEntity } from './entites/phishing.entity';
import { CheckPhishingDto } from './dto/check-phishing.dto';

@Controller('phishing')
export class PhishingController {
    constructor(private readonly phishingService: PhishingService) { }

    @Post()
    create(
        @Body() createPhishingDto: CreatePhishingDto,
    ): Promise<PhishingEntity> {
        // A global ValidationPipe (to be set in main.ts) will validate the DTO
        return this.phishingService.create(createPhishingDto);
    }

    @Post('check')
    async checkUrl(@Body() checkPhishingDto: CheckPhishingDto) {
        const found = await this.phishingService.findByUrl(checkPhishingDto.url);
        return {
            isPhishing: !!found,
            details: found || null,
        };
    }

    @Get()
    findAll(): Promise<PhishingEntity[]> {
        return this.phishingService.findAll();
    }

    @Get(':id')
    async findOne(@Param('id', ParseUUIDPipe) id: string): Promise<PhishingEntity> {
        const phishingEntry = await this.phishingService.findOne(id);
        if (!phishingEntry) {
            throw new NotFoundException(`Phishing entry with ID '${id}' not found.`);
        }
        return phishingEntry;
    }
}


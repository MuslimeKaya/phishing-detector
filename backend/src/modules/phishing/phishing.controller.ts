import {
    Controller,
    Get,
    Post,
    Body,
    Param,
    NotFoundException,
    ParseUUIDPipe,
    Query,
    ParseIntPipe,
    DefaultValuePipe,
    Delete,
} from '@nestjs/common';
import { PhishingService } from './phishing.service';
import { CreatePhishingDto } from './dto/create-phishing.dto';
import { PhishingEntity } from './entites/phishing.entity';


@Controller('phishing')
export class PhishingController {
    constructor(private readonly phishingService: PhishingService) { }

    @Post()
    create(
        @Body() createPhishingDto: CreatePhishingDto,
    ): Promise<PhishingEntity> {
        return this.phishingService.create(createPhishingDto);
    }



    @Get()
    findAll(
        @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
        @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number,
        @Query('search', new DefaultValuePipe('')) search: string,
    ): Promise<{ data: PhishingEntity[]; total: number }> {
        return this.phishingService.findAll({ page, limit, search });
    }

    @Get(':id')
    async findOne(@Param('id', ParseIntPipe) id: number): Promise<PhishingEntity> {
        const phishingEntry: PhishingEntity | null = await this.phishingService.findOne(id);
        if (!phishingEntry) {
            throw new NotFoundException(`Phishing entry with ID '${id}' not found.`);
        }
        return phishingEntry;
    }

    @Delete(':id')
    async remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
        return this.phishingService.delete(id);
    }
}
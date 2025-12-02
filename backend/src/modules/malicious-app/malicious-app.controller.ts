import { Controller, Get, Post, Body, Param, NotFoundException } from '@nestjs/common';
import { MaliciousAppService } from './malicious-app.service';
import { CreateMaliciousAppDto } from './dto/create-malicious-app.dto';

@Controller('malicious-app')
export class MaliciousAppController {
    constructor(private readonly maliciousAppService: MaliciousAppService) {}

    @Post()
    create(@Body() createMaliciousAppDto: CreateMaliciousAppDto) {
        return this.maliciousAppService.create(createMaliciousAppDto);
    }

    @Get()
    findAll() {
        return this.maliciousAppService.findAll();
    }

    @Get(':sha256')
    async findOne(@Param('sha256') sha256: string) {
        return await this.maliciousAppService.findOneBySha256(sha256);
    }

    @Get('exists/:sha256')
    async exists(@Param('sha256') sha256: string) {
        const exists = await this.maliciousAppService.exists(sha256);
        return { exists };
    }
}


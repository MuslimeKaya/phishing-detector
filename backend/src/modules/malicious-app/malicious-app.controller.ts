import { Controller, Get, Post, Body, Param, Delete, Patch } from '@nestjs/common';
import { MaliciousAppService } from './malicious-app.service';
import { MaliciousAppEntity } from './entites/malicious-app.entity';
import { CreateMaliciousAppDto } from './dto/create-malicious-app.dto';

@Controller('malicious-app')
export class MaliciousAppController {
    constructor(private readonly maliciousAppService: MaliciousAppService) { }

    @Post()
    create(@Body() createDto: CreateMaliciousAppDto) {
        return this.maliciousAppService.create(createDto);
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

    @Patch(':id')
    update(@Param('id') id: string, @Body() updateDto: Partial<{ sha256: string; packageName?: string; threatType: string }>) {
        return this.maliciousAppService.update(id, updateDto);
    }

    @Delete(':id')
    delete(@Param('id') id: string) {
        return this.maliciousAppService.delete(id);
    }
}
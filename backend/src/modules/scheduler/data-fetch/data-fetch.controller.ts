import { Controller, Post, Logger, HttpCode, HttpStatus } from '@nestjs/common';
import { DataFetchService } from './data-fetch.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Data Fetch (For Testing)')
@Controller('data-fetch')
export class DataFetchController {
    private readonly logger = new Logger(DataFetchController.name);

    constructor(private readonly dataFetchService: DataFetchService) { }

    @Post('phishing')
    @HttpCode(HttpStatus.ACCEPTED)
    @ApiOperation({ summary: 'Manually trigger phishing data fetch' })
    @ApiResponse({ status: 202, description: 'Phishing data fetch job has been triggered. Check server logs for progress.' })
    async triggerPhishingFetch() {
        this.logger.log('Manually triggering phishing data fetch via API...');
        // Fonksiyonun bitmesini beklemeden yanıt dönmek için await kullanmıyoruz.
        // Böylece uzun süren işlemlerde istek zaman aşımına uğramaz.
        this.dataFetchService.handleFetchPhishingData();
        return { message: 'Phishing data fetch job triggered. Check logs for details.' };
    }

    @Post('malicious-app')
    @HttpCode(HttpStatus.OK)
    @ApiOperation({ summary: 'Manually trigger malicious app data fetch (placeholder)' })
    async triggerMaliciousAppFetch() {
        this.logger.log('Manually triggering malicious app data fetch via API...');
        await this.dataFetchService.handleFetchMaliciousAppData();
        return { message: 'Malicious app data fetch job finished (placeholder).' };
    }
}
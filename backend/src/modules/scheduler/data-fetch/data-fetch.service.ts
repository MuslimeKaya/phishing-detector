import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { PhishingService } from '../../phishing/phishing.service';
import { MaliciousAppService } from '../../malicious-app/malicious-app.service';

interface PhishTankEntry {
    url: string;
    phish_id: number;
    phish_detail_url: string;
    submission_time: string;
    verified: string;
    verification_time: string;
    online: string;
    target: string;
}

@Injectable()
export class DataFetchService {
    private readonly logger = new Logger(DataFetchService.name);

    constructor(
        private readonly httpService: HttpService,
        private readonly phishingService: PhishingService,
        private readonly maliciousAppService: MaliciousAppService,
    ) { }

    @Cron(CronExpression.EVERY_HOUR)
    async handleFetchPhishingData() {
        this.logger.log('Fetching phishing data from PhishTank...');
        const url = 'http://data.phishtank.com/data/online-valid.json';

        let addedCount = 0;
        let skippedCount = 0;
        let failedCount = 0;

        try {
            const response = await firstValueFrom(
                this.httpService.get<PhishTankEntry[]>(url, {
                    headers: {
                        'User-Agent': 'PhishingDetector-NestJS-App/1.0',
                    },
                }),
            );

            const data = response.data;
            this.logger.log(`Fetched ${data.length} entries from PhishTank.`);

            for (const entry of data) {
                try {
                    // Check if the URL already exists
                    const existing = await this.phishingService.findByUrl(entry.url);
                    if (existing) {
                        skippedCount++;
                        continue;
                    }

                    // Create new entry
                    await this.phishingService.create({
                        url: entry.url,
                        source: 'PhishTank',
                        target: entry.target,
                    });
                    addedCount++;
                } catch (error) {
                    failedCount++;
                    this.logger.error(`Failed to process entry for URL: ${entry.url}`, error.stack);
                }
            }
        } catch (error) {
            this.logger.error('Failed to fetch data from PhishTank', error.stack);
        } finally {
            this.logger.log(
                `Phishing data fetch complete. Added: ${addedCount}, Skipped: ${skippedCount}, Failed: ${failedCount}`
            );
        }
    }

    @Cron(CronExpression.EVERY_DAY_AT_3AM)
    async handleFetchMaliciousAppData() {
        this.logger.log('Scheduled job for fetching malicious app data started (placeholder)...');

        this.logger.log('Malicious app data fetch job finished (placeholder).');
    }
}


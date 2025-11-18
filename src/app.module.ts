import { Module } from '@nestjs/common';
import { DataFetchService } from './scheduler/data-fetch/data-fetch.service';

@Module({
    imports: [],
    controllers: [],
    providers: [DataFetchService],
})
export class AppModule { }

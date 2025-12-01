import { Logger, Module } from '@nestjs/common';
import { MaliciousAppModule } from './modules/malicious-app/malicious-app.module';
import { PhishingModule } from './modules/phishing/phishing.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { SchedulerModule } from './modules/scheduler/scheduler.module';

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
        }),
        TypeOrmModule.forRootAsync({
            imports: [ConfigModule],
            useFactory: (configService: ConfigService) => {
                const dbConfig = {
                    type: 'postgres' as const,
                    host: configService.get<string>('DB_HOST'),
                    port: configService.get<number>('DB_PORT'),
                    username: configService.get<string>('DB_USERNAME'),
                    password: configService.get<string>('DB_PASSWORD'),
                    database: configService.get<string>('DB_DATABASE'),
                    name: 'default',
                    autoLoadEntities: true,
                    synchronize: true, // Be cautious with this in production
                    retryAttempts: 10,
                };
                Logger.log(
                    `Connecting to database: host=${dbConfig.host} port=${dbConfig.port} db=${dbConfig.database}`,
                    'TypeOrmModule',
                );
                return dbConfig;
            },
            inject: [ConfigService],
        }),
        MaliciousAppModule,
        PhishingModule,
        SchedulerModule,
    ],
    controllers: [],
    providers: [],
})
export class AppModule { }

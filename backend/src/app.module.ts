import { Logger, MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { PhishingModule } from './modules/phishing/phishing.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { LoggingMiddleware } from './middlewares/logging/logging.middleware';
import { RateLimitMiddleware } from './middlewares/rate-limit/rate-limit.middleware';
import { PrometheusModule } from '@willsoto/nestjs-prometheus';
import { SentryModule } from '@sentry/nestjs/setup';



@Module({
    imports: [
        SentryModule.forRoot(),
        PrometheusModule.register({
            path: '/metrics',
        }),
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
                    synchronize: false,
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

        PhishingModule,

    ],
    controllers: [],
    providers: [],
})
export class AppModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {
        consumer.apply(RateLimitMiddleware, LoggingMiddleware).forRoutes('phishing');
    }
}

// Import with `const Sentry = require("@sentry/nestjs");` if you are using CJS
import * as Sentry from "@sentry/nestjs"
import { nodeProfilingIntegration } from "@sentry/profiling-node";
import { ConfigService } from "@nestjs/config";
import * as dotenv from "dotenv";

dotenv.config();

const configService = new ConfigService(process.env);

Sentry.init({
    dsn: configService.get<string>('SENTRY_DSN'),
    debug: false,
    integrations: [
        nodeProfilingIntegration(),
    ],
    tracesSampleRate: 1.0,
    profilesSampleRate: 1.0,
    sendDefaultPii: true,
});

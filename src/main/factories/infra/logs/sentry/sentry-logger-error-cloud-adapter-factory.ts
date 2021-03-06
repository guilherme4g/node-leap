import { LoggerErrorCloud } from '@/application/protocols/logs/logger-error-cloud';
import { SentryLoggerErrorCloudAdapter } from '@/infra/logs/sentry';

export const makeSentryLoggerErrorCloudAdapter = (): LoggerErrorCloud => {
  return new SentryLoggerErrorCloudAdapter();
};

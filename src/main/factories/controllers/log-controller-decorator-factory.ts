import { Controller } from '@/presentation/http/protocols';
import { LogControllerDecorator } from '@/main/decorators';
import { makeSentryLoggerErrorCloudAdapter } from '@/main/factories/infra/logs/sentry';
import { makePinoLoggerLocalAdapter } from '@/main/factories/infra/logs/pino';

export const makeLogControllerDecorator = (
  controller: Controller
): Controller => {
  const sentryLoggerErrorAdapter = makeSentryLoggerErrorCloudAdapter();
  const pinoLoggerLocalAdapter = makePinoLoggerLocalAdapter();

  const logControllerDecorator = new LogControllerDecorator(
    controller,
    sentryLoggerErrorAdapter,
    pinoLoggerLocalAdapter
  );

  return logControllerDecorator;
};

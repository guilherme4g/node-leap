import 'module-alias/register';

import env from '@/main/config/env';

import { prismaConnector } from '@/infra/database/orm/prisma';

import httpServer from '@/main/config/http-server';

import { makePinoLoggerLocalAdapter } from './factories/infra/logs/pino';
import { makeSentryLoggerErrorCloudAdapter } from './factories/infra/logs/sentry';

const exitStatus = {
  Failure: 1,
  Success: 0,
};

process.setMaxListeners(20);

const loggerLocal = makePinoLoggerLocalAdapter();
const loggerErrorCloud = makeSentryLoggerErrorCloudAdapter();

process.on('unhandledRejection', (reason, promise) => {
  const error = new Error(
    `App exiting due to an unhandled promise: ${promise} and reason: ${reason}`
  );

  loggerLocal.logError(error);
  loggerErrorCloud.log(error);

  throw reason;
});

process.on('uncaughtException', (error) => {
  loggerLocal.logError(error);
  loggerErrorCloud.log(error);

  process.exit(exitStatus.Failure);
});

async function main() {
  try {
    prismaConnector.connect();
    loggerLocal.logInfo(`Prisma connect with success to ${env.databaseUrl}`);

    httpServer.listen(env.port, () =>
      loggerLocal.logInfo(`Server runing at http://localhost:${env.port}`)
    );

    // eslint-disable-next-line no-undef
    const exitSignals: NodeJS.Signals[] = ['SIGINT', 'SIGTERM', 'SIGQUIT'];
    exitSignals.map((sig) =>
      process.on(sig, async () => {
        try {
          httpServer.close();
          await prismaConnector.disconnect();

          loggerLocal.logInfo('App exit with success');
          process.exit(exitStatus.Success);
        } catch (error) {
          const errorWithType = error as Error;

          loggerLocal.logError(errorWithType);

          loggerErrorCloud.log(errorWithType);

          process.exit(exitStatus.Failure);
        }
      })
    );
  } catch (error) {
    const errorWithType = error as Error;

    loggerLocal.logError(errorWithType);

    loggerErrorCloud.log(errorWithType);

    process.exit(exitStatus.Failure);
  }
}

main();

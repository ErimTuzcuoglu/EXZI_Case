import express from 'express';
import config from '@config/appConfig';
import ExpressConfig from '@core/server/config/express';
import routes from '@core/server/routes/index';
import Logger from '@core/services/Logger';
// middlewares
import errorHandlingMiddleware from '@core/server/middlewares/initial/errorHandlingMiddleware';
import notFound from '@core/server/middlewares/initial/notFound';
import loggingMiddleware from '@core/server/middlewares/initial/loggingMiddleware';

async function startServer() {
  const app = express();
  // express.js configuration (middlewares etc.)
  (new ExpressConfig(app, config));

  if (config.urlLoggingEnabled) {
    app.use(loggingMiddleware);
  }
  // routes for each endpoint
  app.use('/api', routes);

  app.use(notFound);
  // error handling middleware
  // Important: Never remove next parameter even if it is not used.
  // eslint-disable-next-line no-unused-vars
  app.use((error, req, res, next) => {
    errorHandlingMiddleware(error, req, res);
  });

  if (process.env.NODE_ENV !== 'test') {
    app.listen(config.port, () => {
      Logger.log(`Server is listening on port ${config.port}`);
    });
  }
  return app;
}

startServer().catch((error) => {
  Logger.error(error);
});
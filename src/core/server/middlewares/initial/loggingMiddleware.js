import Logger from '@core/util/Logger';

class LoggingMiddleware {
  handle = (req) => {
    const {method, url} = req;
    Logger.info(`[${method}] ${url}`);
  };
}

export default new LoggingMiddleware().handle;

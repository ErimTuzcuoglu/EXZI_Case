import Logger from '@core/services/Logger';

class LoggingMiddleware {
  handle = (req, res, next) => {
    const {method, url} = req;
    Logger.info(`[${method}] ${url}`);
    next();
  };
}

export default new LoggingMiddleware().handle;
